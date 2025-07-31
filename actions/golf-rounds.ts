"use server"

import { auth } from "@clerk/nextjs/server"
import { and, desc, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { db } from "@/db"
import { customers, golfRounds, type InsertGolfRound } from "@/db/schema/customers"

export async function createGolfRound(data: {
  courseName: string
  datePlayed: Date
  score: number
  par?: number
  notes?: string
}) {
  const { userId } = await auth()
  
  if (!userId) {
    redirect("/login")
  }

  // Check if user exists and get their membership
  const customer = await db
    .select()
    .from(customers)
    .where(eq(customers.userId, userId))
    .limit(1)

  let userCustomer = customer[0]

  // Create customer if doesn't exist
  if (!userCustomer) {
    const [newCustomer] = await db
      .insert(customers)
      .values({
        userId,
        membership: "free"
      })
      .returning()
    userCustomer = newCustomer
  }

  // Check round limits for free users
  if (userCustomer.membership === "free") {
    const existingRounds = await db
      .select()
      .from(golfRounds)
      .where(eq(golfRounds.userId, userId))

    if (existingRounds.length >= 3) {
      throw new Error("Free users can only log 3 rounds. Upgrade to Pro for unlimited rounds.")
    }
  }

  const [round] = await db
    .insert(golfRounds)
    .values({
      userId,
      courseName: data.courseName,
      datePlayed: data.datePlayed,
      score: data.score,
      par: data.par || null,
      notes: data.notes || null
    })
    .returning()

  revalidatePath("/dashboard")
  return round
}

export async function updateGolfRound(
  roundId: string, 
  data: {
    courseName: string
    datePlayed: Date
    score: number
    par?: number
    notes?: string
  }
) {
  const { userId } = await auth()
  
  if (!userId) {
    redirect("/login")
  }

  const [round] = await db
    .update(golfRounds)
    .set({
      courseName: data.courseName,
      datePlayed: data.datePlayed,
      score: data.score,
      par: data.par || null,
      notes: data.notes || null,
      updatedAt: new Date()
    })
    .where(and(
      eq(golfRounds.id, roundId),
      eq(golfRounds.userId, userId)
    ))
    .returning()

  if (!round) {
    throw new Error("Round not found or you don't have permission to update it")
  }

  revalidatePath("/dashboard")
  return round
}

export async function deleteGolfRound(roundId: string) {
  const { userId } = await auth()
  
  if (!userId) {
    redirect("/login")
  }

  const [round] = await db
    .delete(golfRounds)
    .where(and(
      eq(golfRounds.id, roundId),
      eq(golfRounds.userId, userId)
    ))
    .returning()

  if (!round) {
    throw new Error("Round not found or you don't have permission to delete it")
  }

  revalidatePath("/dashboard")
  return round
}

export async function getUserGolfRounds() {
  const { userId } = await auth()
  
  if (!userId) {
    redirect("/login")
  }

  const rounds = await db
    .select()
    .from(golfRounds)
    .where(eq(golfRounds.userId, userId))
    .orderBy(desc(golfRounds.datePlayed))

  return rounds
}

export async function getUserRoundCount() {
  const { userId } = await auth()
  
  if (!userId) {
    return 0
  }

  const rounds = await db
    .select()
    .from(golfRounds)
    .where(eq(golfRounds.userId, userId))

  return rounds.length
}

export async function canCreateMoreRounds() {
  const { userId } = await auth()
  
  if (!userId) {
    return false
  }

  const customer = await db
    .select()
    .from(customers)
    .where(eq(customers.userId, userId))
    .limit(1)

  if (!customer[0]) {
    return true // New users can create their first rounds
  }

  if (customer[0].membership === "pro") {
    return true
  }

  const roundCount = await getUserRoundCount()
  return roundCount < 3
}