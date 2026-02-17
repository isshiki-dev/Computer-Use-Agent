'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react'

interface AnnotationPanelProps {
  selectedStep: number | null
}

export function AnnotationPanel({ selectedStep }: AnnotationPanelProps) {
  const [annotation, setAnnotation] = useState('')
  const [rating, setRating] = useState<'positive' | 'negative' | null>(null)

  const handleSave = () => {
    console.log('Annotation saved:', { selectedStep, rating, annotation })
    setAnnotation('')
    setRating(null)
  }

  return (
    <div className="p-4 space-y-3">
      <div className="flex items-center gap-2">
        <MessageSquare className="h-4 w-4 text-muted-foreground" />
        <h3 className="text-sm font-semibold text-foreground">Annotation Tools</h3>
      </div>

      {selectedStep ? (
        <div className="space-y-3">
          <div>
            <Label className="text-xs text-muted-foreground">Annotating Step {selectedStep}</Label>
          </div>

          <div className="flex gap-2">
            <Button
              variant={rating === 'positive' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setRating('positive')}
              className="flex-1 gap-2"
            >
              <ThumbsUp className="h-4 w-4" />
              Correct
            </Button>
            <Button
              variant={rating === 'negative' ? 'destructive' : 'outline'}
              size="sm"
              onClick={() => setRating('negative')}
              className="flex-1 gap-2"
            >
              <ThumbsDown className="h-4 w-4" />
              Error
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="annotation" className="text-xs">
              Notes
            </Label>
            <Textarea
              id="annotation"
              placeholder="Add observations, corrections, or feedback..."
              value={annotation}
              onChange={(e) => setAnnotation(e.target.value)}
              className="min-h-[80px] text-sm"
            />
          </div>

          <Button
            onClick={handleSave}
            size="sm"
            className="w-full"
            disabled={!rating && !annotation}
          >
            Save Annotation
          </Button>
        </div>
      ) : (
        <div className="py-8 text-center">
          <p className="text-xs text-muted-foreground">
            Select a step from the timeline to add annotations
          </p>
        </div>
      )}

      <div className="pt-3 border-t border-border">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Total Annotations</span>
          <Badge variant="secondary">23</Badge>\
        </div>
      </div>
    </div>
  )
}
