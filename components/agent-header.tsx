import { Activity, Circle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface AgentHeaderProps {
  status: 'idle' | 'running' | 'paused'
}

export function AgentHeader({ status }: AgentHeaderProps) {
  return (
    <header className="border-b border-border bg-card">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold text-foreground">Computer Use Agent</h1>
          </div>
          <Badge
            variant={status === 'running' ? 'default' : status === 'paused' ? 'secondary' : 'outline'}
            className="flex items-center gap-1.5"
          >
            <Circle
              className={`h-2 w-2 fill-current ${
                status === 'running' ? 'text-green-500' :
                status === 'paused' ? 'text-yellow-500' :
                'text-muted-foreground'
              }`}
            />
            {status === 'running' ? 'Active' : status === 'paused' ? 'Paused' : 'Idle'}
          </Badge>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Session ID:</span>
            <code className="font-mono text-xs bg-muted px-2 py-1 rounded text-foreground">
              ses_8k2mq9x4p7n
            </code>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Uptime:</span>
            <span className="font-mono text-xs text-foreground">00:47:32</span>
          </div>
        </div>
      </div>
    </header>
  )
}
