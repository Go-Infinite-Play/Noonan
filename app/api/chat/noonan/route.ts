import { auth } from "@clerk/nextjs/server"
import Anthropic from "@anthropic-ai/sdk"
import { NextRequest, NextResponse } from "next/server"

import { db } from "@/db"
import { conversations, golfRounds } from "@/db/schema/customers"
import { eq, desc } from "drizzle-orm"

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { message, roundId } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Get user's recent rounds for context
    const recentRounds = await db
      .select()
      .from(golfRounds)
      .where(eq(golfRounds.userId, userId))
      .orderBy(desc(golfRounds.datePlayed))
      .limit(5)

    // Get conversation history for context
    const recentConversations = await db
      .select()
      .from(conversations)
      .where(eq(conversations.userId, userId))
      .orderBy(desc(conversations.createdAt))
      .limit(10)

    // Build context for Noonan
    const contextMessage = `You are Noonan, a passionate golf buddy who genuinely cares about every round of golf. You're enthusiastic, supportive, and always interested in hearing about someone's golf game. You celebrate good shots, empathize with tough rounds, and offer encouragement and tips.

Here's what you know about this golfer:

Recent Rounds:
${recentRounds.map(round => 
  `- ${round.datePlayed.toDateString()}: Shot ${round.score} at ${round.courseName}${round.par ? ` (Par ${round.par})` : ''}${round.notes ? ` - Notes: ${round.notes}` : ''}`
).join('\n')}

${recentConversations.length > 0 ? `Recent conversation context:
${recentConversations.reverse().map(conv => 
  `Golfer: ${conv.message}\nNoonan: ${conv.response}`
).join('\n\n')}` : 'This is your first conversation with this golfer.'}

Remember: You actually care about their golf game! Be enthusiastic, personal, and reference their previous rounds when relevant.`

    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 500,
      messages: [
        {
          role: "user",
          content: `${contextMessage}\n\nGolfer's message: ${message}`
        }
      ],
    })

    const noonanResponse = response.content[0].type === 'text' 
      ? response.content[0].text 
      : "I'm having trouble responding right now, but I'm still here for you!"

    // Save the conversation
    await db.insert(conversations).values({
      userId,
      roundId: roundId || null,
      message,
      response: noonanResponse
    })

    return NextResponse.json({ response: noonanResponse })

  } catch (error) {
    console.error("Error in Noonan chat:", error)
    return NextResponse.json(
      { error: "Sorry, I'm having trouble right now. Try again in a moment!" }, 
      { status: 500 }
    )
  }
}