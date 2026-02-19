'use client'

import { useEffect, useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Clock, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'

interface Task {
  id: string
  timestamp: string
  action: string
  status: 'processing' | 'completed' | 'error'
  duration?: string
}

interface TaskFeedProps {
  agentStatus: 'idle' | 'running' | 'paused'
}

const mockTasks: Task[] = [
  { id: '1', timestamp: '14:32:18', action: 'Navigate to login page', status: 'completed', duration: '1.2s' },
  { id: '2', timestamp: '14:32:20', action: 'Enter username credentials', status: 'completed', duration: '0.8s' },
  { id: '3', timestamp: '14:32:21', action: 'Enter password credentials', status: 'completed', duration: '0.7s' },
  { id: '4', timestamp: '14:32:23', action: 'Click login button', status: 'processing' },
  { id: '5', timestamp: '14:32:24', action: 'Wait for dashboard load', status: 'processing' },
]

export function TaskFeed({ agentStatus }: TaskFeedProps) {
  const [tasks, setTasks] = useState<Task[]>(mockTasks)

  useEffect(() => {
    if (agentStatus === 'running') {
      const interval = setInterval(() => {
        setTasks(prev => {
          const updated = [...prev]
          const processingIdx = updated.findIndex(t => t.status === 'processing')
          if (processingIdx !== -1 && Math.random() > 0.3) {
            updated[processingIdx] = {
              ...updated[processingIdx],
              status: 'completed',
              duration: `${(Math.random() * 2 + 0.5).toFixed(1)}s`
            }
          }
          return updated
        })
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [agentStatus])

  return (
    <ScrollArea className="flex-1">
      <div className="p-4 space-y-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="p-3 rounded-lg border border-border bg-background/50 hover:bg-background transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                {task.status === 'completed' && (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                )}
                {task.status === 'processing' && (
                  <Loader2 className="h-4 w-4 text-primary animate-spin" />
                )}
                {task.status === 'error' && (
                  <AlertCircle className="h-4 w-4 text-destructive" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground leading-relaxed">{task.action}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-xs text-muted-foreground font-mono flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {task.timestamp}
                  </span>
                  {task.duration && (
                    <Badge variant="outline" className="text-xs h-5">
                      {task.duration}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
