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
            <Label className="text-[10px] lg:text-xs text-muted-foreground uppercase tracking-wider font-bold">
              Annotating Step {selectedStep}
            </Label>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              variant={rating === 'positive' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setRating('positive')}
              className="flex-1 gap-2 h-8 lg:h-9 text-xs"
            >
              <ThumbsUp className="h-3.5 w-3.5" />
              Correct
            </Button>
            <Button
              variant={rating === 'negative' ? 'destructive' : 'outline'}
              size="sm"
              onClick={() => setRating('negative')}
              className="flex-1 gap-2 h-8 lg:h-9 text-xs"
            >
              <ThumbsDown className="h-3.5 w-3.5" />
              Error
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="annotation" className="text-[10px] lg:text-xs text-muted-foreground">
              Notes
            </Label>
            <Textarea
              id="annotation"
              placeholder="Add observations, corrections, or feedback..."
              value={annotation}
              onChange={(e) => setAnnotation(e.target.value)}
              className="min-h-[60px] lg:min-h-[80px] text-xs lg:text-sm resize-none"
            />
          </div>

          <Button
            onClick={handleSave}
            size="sm"
            className="w-full text-xs h-8 lg:h-9"
            disabled={!rating && !annotation}
          >
            Save Annotation
          </Button>
        </div>
      ) : (
        <div className="py-6 lg:py-8 text-center bg-muted/20 rounded-lg border border-dashed border-border">
          <p className="text-[10px] lg:text-xs text-muted-foreground px-4">
            Select a step from the timeline to start annotating
          </p>
        </div>
      )}

      <div className="pt-3 border-t border-border">
        <div className="flex items-center justify-between text-[10px] lg:text-xs">
          <span className="text-muted-foreground">Total Annotations</span>
          <Badge variant="secondary" className="px-1.5 py-0">23</Badge>
        </div>
      </div>
    </div>
  )
}
