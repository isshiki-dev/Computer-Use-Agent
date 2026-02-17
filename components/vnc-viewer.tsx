import { Monitor, Maximize2 } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface VncViewerProps {
  selectedStep: number | null
}

export function VncViewer({ selectedStep }: VncViewerProps) {
  return (
    <Card className="h-full flex flex-col bg-black border-border overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
        <div className="flex items-center gap-2">
          <Monitor className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">VNC Stream</span>
          <span className="text-xs text-muted-foreground">1920x1080 @ 60fps</span>
        </div>
        <Button variant="ghost" size="sm" className="h-8 px-2">
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 relative bg-gradient-to-br from-background to-muted/20 flex items-center justify-center p-8">
        {/* Placeholder VNC Window */}
        <div className="w-full h-full bg-[#0a0a0a] rounded-lg border border-border/50 flex items-center justify-center relative overflow-hidden">
          {/* Simulated Desktop Environment */}
          <div className="absolute inset-0">
            {/* Simulated browser window */}
            <div className="absolute top-8 left-8 right-8 bg-card border border-border rounded-lg shadow-2xl">
              {/* Browser chrome */}
              <div className="h-10 bg-muted border-b border-border flex items-center px-3 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 bg-background/50 rounded px-3 py-1 text-xs text-muted-foreground ml-4">
                  https://example.com/dashboard
                </div>
              </div>
              {/* Content area */}
              <div className="p-6 h-64 bg-gradient-to-br from-primary/5 to-accent/5">
                <div className="space-y-3">
                  <div className="h-6 w-48 bg-primary/20 rounded animate-pulse" />
                  <div className="h-4 w-full bg-muted/50 rounded" />
                  <div className="h-4 w-3/4 bg-muted/50 rounded" />
                  <div className="h-4 w-5/6 bg-muted/50 rounded" />
                </div>
              </div>
            </div>

            {/* Mouse cursor indicator */}
            <div className="absolute top-[45%] left-[60%] w-4 h-4 border-2 border-primary shadow-lg animate-pulse"
                 style={{ transform: 'rotate(45deg)' }} />
          </div>

          {selectedStep !== null && (
            <div className="absolute top-4 right-4 bg-primary/10 border border-primary/30 rounded-lg px-3 py-2">
              <span className="text-xs font-mono text-primary">Viewing Step {selectedStep}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
