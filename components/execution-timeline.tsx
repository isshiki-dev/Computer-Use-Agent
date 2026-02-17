'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { CheckCircle2, Circle, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ExecutionStep {
  id: number
  title: string
  description: string
  status: 'completed' | 'active' | 'pending'
  timestamp?: string
}

interface ExecutionTimelineProps {
  selectedStep: number | null
  onSelectStep: (step: number | null) => void
  agentStatus: 'idle' | 'running' | 'paused'
}

const steps: ExecutionStep[] = [
  {
    id: 1,
    title: 'Initialize Session',
    description: 'Set up browser environment',
    status: 'completed',
    timestamp: '14:31:45'
  },
  {
    id: 2,
    title: 'Navigate to Target',
    description: 'Load application URL',
    status: 'completed',
    timestamp: '14:32:01'
  },
  {
    id: 3,
    title: 'Authenticate User',
    description: 'Enter credentials and login',
    status: 'completed',
    timestamp: '14:32:18'
  },
  {
    id: 4,
    title: 'Extract Data',
    description: 'Parse dashboard elements',
    status: 'active',
    timestamp: '14:32:45'
  },
  {
    id: 5,
    title: 'Process Results',
    description: 'Aggregate and format data',
    status: 'pending'
  },
  {
    id: 6,
    title: 'Generate Report',
    description: 'Create output document',
    status: 'pending'
  },
  {
    id: 7,
    title: 'Cleanup',
    description: 'Close session and cleanup',
    status: 'pending'
  },
]

export function ExecutionTimeline({ selectedStep, onSelectStep, agentStatus }: ExecutionTimelineProps) {
  return (
    <ScrollArea className="flex-1">
      <div className="p-4">
        <div className="relative space-y-1">
          {/* Timeline connector line */}
          <div className="absolute left-[13px] top-2 bottom-2 w-[2px] bg-border" />

          {steps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => onSelectStep(step.id === selectedStep ? null : step.id)}
              className={cn(
                "relative w-full text-left p-3 rounded-lg transition-all",
                "hover:bg-accent/50",
                selectedStep === step.id && "bg-accent",
                step.status === 'active' && agentStatus === 'running' && "ring-1 ring-primary/50"
              )}
            >
              <div className="flex items-start gap-3">
                <div className="relative mt-0.5 z-10">
                  {step.status === 'completed' && (
                    <CheckCircle2 className="h-6 w-6 text-green-500 fill-green-500/20" />
                  )}
                  {step.status === 'active' && (
                    <Loader2 className={cn(
                      "h-6 w-6 text-primary",
                      agentStatus === 'running' && "animate-spin"
                    )} />
                  )}
                  {step.status === 'pending' && (
                    <Circle className="h-6 w-6 text-muted-foreground" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className={cn(
                      "text-sm font-medium leading-relaxed",
                      step.status === 'completed' && "text-foreground",
                      step.status === 'active' && "text-primary",
                      step.status === 'pending' && "text-muted-foreground"
                    )}>
                      {step.title}
                    </h3>
                    {step.timestamp && (
                      <span className="text-xs font-mono text-muted-foreground shrink-0">
                        {step.timestamp}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </ScrollArea>
  )
}
