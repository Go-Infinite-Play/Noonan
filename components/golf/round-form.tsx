"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createGolfRound, updateGolfRound } from "@/actions/golf-rounds"
import { toast } from "sonner"
import type { SelectGolfRound } from "@/db/schema/customers"

interface RoundFormProps {
  round?: SelectGolfRound
  onSuccess?: () => void
  onCancel?: () => void
}

export function RoundForm({ round, onSuccess, onCancel }: RoundFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    courseName: round?.courseName || "",
    datePlayed: round?.datePlayed.toISOString().split('T')[0] || new Date().toISOString().split('T')[0],
    score: round?.score?.toString() || "",
    par: round?.par?.toString() || "",
    notes: round?.notes || ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const data = {
        courseName: formData.courseName,
        datePlayed: new Date(formData.datePlayed),
        score: parseInt(formData.score),
        par: formData.par ? parseInt(formData.par) : undefined,
        notes: formData.notes || undefined
      }

      if (round) {
        await updateGolfRound(round.id, data)
        toast.success("Round updated successfully!")
      } else {
        await createGolfRound(data)
        toast.success("Round logged successfully!")
      }

      onSuccess?.()
    } catch (error) {
      console.error("Error saving round:", error)
      toast.error(error instanceof Error ? error.message : "Failed to save round")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="courseName">Course Name</Label>
        <Input
          id="courseName"
          type="text"
          value={formData.courseName}
          onChange={(e) => handleChange("courseName", e.target.value)}
          placeholder="e.g., Pebble Beach Golf Links"
          required
        />
      </div>

      <div>
        <Label htmlFor="datePlayed">Date Played</Label>
        <Input
          id="datePlayed"
          type="date"
          value={formData.datePlayed}
          onChange={(e) => handleChange("datePlayed", e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="score">Score</Label>
          <Input
            id="score"
            type="number"
            value={formData.score}
            onChange={(e) => handleChange("score", e.target.value)}
            placeholder="e.g., 85"
            required
            min="1"
            max="200"
          />
        </div>

        <div>
          <Label htmlFor="par">Course Par (optional)</Label>
          <Input
            id="par"
            type="number"
            value={formData.par}
            onChange={(e) => handleChange("par", e.target.value)}
            placeholder="e.g., 72"
            min="50"
            max="80"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="notes">Notes (optional)</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => handleChange("notes", e.target.value)}
          placeholder="How did you play? Any memorable shots or challenges?"
          rows={3}
        />
      </div>

      <div className="flex gap-2 pt-4">
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="flex-1"
        >
          {isSubmitting ? "Saving..." : round ? "Update Round" : "Log Round"}
        </Button>
        {onCancel && (
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  )
}