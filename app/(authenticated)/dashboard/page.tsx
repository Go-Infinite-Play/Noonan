import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { eq } from "drizzle-orm"

import { db } from "@/db"
import { customers } from "@/db/schema/customers"
import { getUserGolfRounds, canCreateMoreRounds } from "@/actions/golf-rounds"
import { RoundsList } from "@/components/golf/rounds-list"
import { NoonanChat } from "@/components/golf/noonan-chat"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Target, TrendingUp, MessageCircle, Crown } from "lucide-react"
import Link from "next/link"

export default async function Page() {
  const { userId } = await auth()
  
  if (!userId) {
    redirect("/login")
  }

  // Get user's customer data
  const customer = await db
    .select()
    .from(customers)
    .where(eq(customers.userId, userId))
    .limit(1)

  const userMembership = customer[0]?.membership || "free"
  
  // Get user's golf rounds
  const rounds = await getUserGolfRounds()
  const canCreate = await canCreateMoreRounds()

  // Calculate stats
  const totalRounds = rounds.length
  const averageScore = totalRounds > 0 
    ? Math.round(rounds.reduce((sum, round) => sum + round.score, 0) / totalRounds)
    : 0
    
  const recentRounds = rounds.slice(0, 3)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome to Noonan</h1>
          <p className="text-muted-foreground mt-2">
            Finally, someone who actually cares about your golf game!
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={userMembership === "pro" ? "default" : "secondary"}>
            {userMembership === "pro" ? (
              <>
                <Crown className="h-3 w-3 mr-1" />
                Pro
              </>
            ) : (
              "Free Plan"
            )}
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      {totalRounds > 0 && (
        <div className="grid gap-4 md:grid-cols-3">
          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium">Total Rounds</h3>
            </div>
            <p className="text-2xl font-bold mt-2">{totalRounds}</p>
          </div>
          
          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium">Average Score</h3>
            </div>
            <p className="text-2xl font-bold mt-2">{averageScore}</p>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium">Best Round</h3>
            </div>
            <p className="text-2xl font-bold mt-2">
              {Math.min(...rounds.map(r => r.score))}
            </p>
          </div>
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
        {/* Rounds List */}
        <div className="space-y-6">
          <RoundsList 
            rounds={rounds}
            userMembership={userMembership}
            canCreateMore={canCreate}
          />
          
          {/* Upgrade CTA for free users near limit */}
          {userMembership === "free" && totalRounds >= 2 && (
            <div className="border border-yellow-200 bg-yellow-50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Crown className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-medium text-yellow-800">
                    You're running out of free rounds!
                  </h3>
                  <p className="text-sm text-yellow-700 mt-1">
                    Upgrade to Pro for unlimited round logging and enhanced features.
                  </p>
                  <Link href="/dashboard/billing" className="mt-2 inline-block">
                    <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                      Upgrade to Pro
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Chat with Noonan */}
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Chat with Noonan</h2>
            <p className="text-sm text-muted-foreground">
              Share your latest round or get some encouragement!
            </p>
          </div>
          <NoonanChat />
        </div>
      </div>
    </div>
  )
}
