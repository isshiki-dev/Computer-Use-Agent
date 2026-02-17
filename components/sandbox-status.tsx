import { Badge } from '@/components/ui/badge'
import { Server, Cpu, HardDrive, Activity } from 'lucide-react'

export function SandboxStatus() {
  return (
    <div className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Server className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold text-foreground">E2B Sandbox</h3>
        </div>
        <Badge variant="default" className="gap-1.5">
          <Activity className="h-3 w-3" />
          Connected
        </Badge>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Cpu className="h-3.5 w-3.5" />
            <span>CPU Usage</span>
          </div>
          <span className="font-mono text-foreground">34%</span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary w-[34%] rounded-full transition-all" />
        </div>

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-muted-foreground">
            <HardDrive className="h-3.5 w-3.5" />
            <span>Memory</span>
          </div>
          <span className="font-mono text-foreground">2.1 / 4.0 GB</span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-accent w-[52%] rounded-full transition-all" />
        </div>
      </div>

      <div className="pt-2 border-t border-border text-xs space-y-1">
        <div className="flex justify-between">
          <span className="text-muted-foreground">OS:</span>
          <span className="text-foreground">Ubuntu 22.04 LTS</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Startup Time:</span>
          <span className="text-foreground">152ms</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Sandbox ID:</span>
          <code className="font-mono text-foreground">e2b_x9k4m2p</code>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Region:</span>
          <span className="text-foreground">us-east-1</span>
        </div>
      </div>
    </div>
  )
}
