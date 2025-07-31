"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { deleteGolfRound } from "@/actions/golf-rounds"
import { toast } from "sonner"
import { Trash2, Edit, Calendar, MapPin, Target } from "lucide-react"
import type { SelectGolfRound } from "@/db/schema/customers"
import { RoundForm } from "./round-form"

interface RoundsListProps {
  rounds: SelectGolfRound[]
  userMembership: "free" | "pro"
  canCreateMore: boolean
}

export function RoundsList({ rounds, userMembership, canCreateMore }: RoundsListProps) {
  const [editingRound, setEditingRound] = useState<SelectGolfRound | null>(null)
  const [showForm, setShowForm] = useState(false)

  const handleDelete = async (roundId: string) => {
    if (!confirm("Are you sure you want to delete this round?")) return

    try {
      await deleteGolfRound(roundId)
      toast.success("Round deleted successfully!")
    } catch (error) {
      console.error("Error deleting round:", error)
      toast.error("Failed to delete round")
    }
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }).format(new Date(date))
  }

  const getScoreColor = (score: number, par?: number | null) => {
    if (!par) return "text-muted-foreground"
    
    const diff = score - par
    if (diff <= -2) return "text-green-600"
    if (diff === -1) return "text-green-500"
    if (diff === 0) return "text-blue-600"
    if (diff <= 2) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreLabel = (score: number, par?: number | null) => {
    if (!par) return ""
    
    const diff = score - par
    if (diff <= -2) return "Eagle or better!"
    if (diff === -1) return "Birdie"
    if (diff === 0) return "Even par"
    if (diff <= 2) return `+${diff}`
    return `+${diff}`
  }

  if (editingRound) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Edit Round</h3>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setEditingRound(null)}
          >
            Cancel
          </Button>
        </div>
        <RoundForm 
          round={editingRound}
          onSuccess={() => {
            setEditingRound(null)
            toast.success("Round updated!")
          }}
          onCancel={() => setEditingRound(null)}
        />
      </div>
    )
  }

  if (showForm) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Log New Round</h3>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowForm(false)}
          >
            Cancel
          </Button>
        </div>
        <RoundForm 
          onSuccess={() => {
            setShowForm(false)
            toast.success("Round logged!")
          }}
          onCancel={() => setShowForm(false)}
        />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">My Golf Rounds</h2>
          <p className="text-sm text-muted-foreground">
            {rounds.length} round{rounds.length !== 1 ? 's' : ''} logged
            {userMembership === "free" && (
              <span className="ml-2">
                ({3 - rounds.length} remaining on free plan)
              </span>
            )}
          </p>
        </div>
        
        {canCreateMore ? (
          <Button onClick={() => setShowForm(true)}>
            Log New Round
          </Button>
        ) : (
          <div className="text-right">
            <Button disabled>
              Log New Round
            </Button>
            <p className="text-xs text-muted-foreground mt-1">
              Upgrade to Pro for unlimited rounds
            </p>
          </div>
        )}
      </div>

      {rounds.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-muted-foreground/25 rounded-lg">
          <Target className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-medium mb-2">No rounds logged yet</h3>
          <p className="text-muted-foreground mb-4">
            Start tracking your golf game and get feedback from Noonan!
          </p>
          {canCreateMore && (
            <Button onClick={() => setShowForm(true)}>
              Log Your First Round
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {rounds.map((round) => (
            <div 
              key={round.id}
              className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <h3 className="font-medium">{round.courseName}</h3>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(round.datePlayed)}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`text-2xl font-bold ${getScoreColor(round.score, round.par)}`}>
                      {round.score}
                    </span>
                    {round.par && (
                      <Badge variant="secondary" className="text-xs">
                        Par {round.par} • {getScoreLabel(round.score, round.par)}
                      </Badge>
                    )}
                  </div>

                  {round.notes && (
                    <p className="text-sm text-muted-foreground bg-muted/50 p-2 rounded">
                      {round.notes}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-1 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingRound(round)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(round.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}