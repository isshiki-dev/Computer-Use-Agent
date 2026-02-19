import { Activity, Circle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface AgentHeaderProps {
  status: 'idle' | 'running' | 'paused'
}

export function AgentHeader({ status }: AgentHeaderProps) {
  return (
    <header className="border-b border-border bg-card">
      <div className="flex items-center justify-between px-4 lg:px-6 py-3 lg:py-4">
        <div className="flex items-center gap-3 lg:gap-4">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 lg:h-6 lg:w-6 text-primary" />
            <h1 className="text-sm lg:text-xl font-semibold text-foreground truncate max-w-[120px] sm:max-w-none">
              Agent
              <span className="hidden sm:inline"> Dashboard</span>
            </h1>
          </div>
          <Badge
            variant={status === 'running' ? 'default' : status === 'paused' ? 'secondary' : 'outline'}
            className="flex items-center gap-1.5 px-2 py-0.5 text-[10px] lg:text-xs"
          >
            <Circle
              className={`h-1.5 w-1.5 lg:h-2 lg:w-2 fill-current ${
                status === 'running' ? 'text-green-500' :
                status === 'paused' ? 'text-yellow-500' :
                'text-muted-foreground'
              }`}
            />
            <span className="capitalize">{status === 'running' ? 'Active' : status}</span>
          </Badge>
        </div>

        <div className="flex items-center gap-3 lg:gap-6">
          <div className="hidden md:flex items-center gap-2 text-xs lg:text-sm">
            <span className="text-muted-foreground">Session:</span>
            <code className="font-mono text-[10px] lg:text-xs bg-muted px-2 py-1 rounded text-foreground">
              8k2mq9x4
            </code>
          </div>
          <div className="flex items-center gap-2 text-xs lg:text-sm">
            <span className="hidden sm:inline text-muted-foreground">Uptime:</span>
            <span className="font-mono text-[10px] lg:text-xs text-foreground bg-muted/50 px-2 py-1 rounded">00:47:32</span>
          </div>
        </div>
      </div>
    </header>
  )
}
