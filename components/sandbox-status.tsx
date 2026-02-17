import { Badge } from '@/components/ui/badge'
import { Server, Cpu, HardDrive, Activity, WifiOff } from 'lucide-react'

interface SandboxStatusProps {
  sandboxId?: string | null
  cpu?: number
  memory?: string
}

export function SandboxStatus({ sandboxId, cpu = 0, memory = '0.0' }: SandboxStatusProps) {
  const isConnected = !!sandboxId

  return (
    <div className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Server className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold text-foreground">E2B Sandbox</h3>
        </div>
        {isConnected ? (
          <Badge variant="default" className="gap-1.5 bg-green-500/10 text-green-500 border-green-500/20">
            <Activity className="h-3 w-3" />
            Connected
          </Badge>
        ) : (
          <Badge variant="outline" className="gap-1.5 text-muted-foreground">
            <WifiOff className="h-3 w-3" />
            Disconnected
          </Badge>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Cpu className="h-3.5 w-3.5" />
            <span>CPU Usage</span>
          </div>
          <span className="font-mono text-foreground">{cpu}%</span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${cpu}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-muted-foreground">
            <HardDrive className="h-3.5 w-3.5" />
            <span>Memory</span>
          </div>
          <span className="font-mono text-foreground">{memory} / 4.0 GB</span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-500"
            style={{ width: `${(parseFloat(memory) / 4) * 100}%` }}
          />
        </div>
      </div>

      <div className="pt-2 border-t border-border text-xs space-y-1">
        <div className="flex justify-between">
          <span className="text-muted-foreground">OS:</span>
          <span className="text-foreground">Ubuntu 22.04 LTS</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Sandbox ID:</span>
          <code className="font-mono text-foreground">{sandboxId || 'none'}</code>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Region:</span>
          <span className="text-foreground">us-east-1</span>
        </div>
      </div>
    </div>
  )
}
