import { Monitor, Maximize2, ExternalLink } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface VncViewerProps {
  selectedStep: number | null
  vncUrl?: string | null
}

export function VncViewer({ selectedStep, vncUrl }: VncViewerProps) {
  return (
    <Card className="h-full flex flex-col bg-black border-border overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
        <div className="flex items-center gap-2">
          <Monitor className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">
            {vncUrl ? 'Live VNC Stream' : 'VNC Stream'}
          </span>
          <span className="text-xs text-muted-foreground">1920x1080 @ 60fps</span>
        </div>
        <div className="flex items-center gap-2">
          {vncUrl && (
            <Button variant="outline" size="sm" className="h-8 gap-2" asChild>
              <a href={vncUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3 w-3" />
                Open External
              </a>
            </Button>
          )}
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 relative bg-gradient-to-br from-background to-muted/20 flex items-center justify-center p-8">
        {vncUrl ? (
          <div className="w-full h-full bg-[#0a0a0a] rounded-lg border border-border/50 flex flex-col items-center justify-center relative overflow-hidden">
             {/* In a real implementation, you'd use a VNC client like noVNC here */}
             {/* Since we can't easily embed a full VNC client in this mockup, we'll show a high-fidelity placeholder with the real URL info */}
             <div className="text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto animate-pulse">
                  <Monitor className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground">Streaming Sandbox Desktop</h3>
                  <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
                    Secure connection established via E2B. The agent is ready for computer use tasks.
                  </p>
                </div>
                <code className="block text-xs bg-muted p-2 rounded border border-border text-primary font-mono">
                  {vncUrl}
                </code>
             </div>

             {selectedStep !== null && (
                <div className="absolute top-4 right-4 bg-primary/10 border border-primary/30 rounded-lg px-3 py-2">
                  <span className="text-xs font-mono text-primary">Viewing Step {selectedStep}</span>
                </div>
              )}
          </div>
        ) : (
          <div className="w-full h-full bg-[#0a0a0a] rounded-lg border border-border/50 flex items-center justify-center relative overflow-hidden">
            {/* Simulated Desktop Environment */}
            <div className="absolute inset-0 opacity-50 grayscale">
              {/* Simulated browser window */}
              <div className="absolute top-8 left-8 right-8 bg-card border border-border rounded-lg shadow-2xl">
                <div className="h-10 bg-muted border-b border-border flex items-center px-3 gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                </div>
                <div className="p-6 h-64 bg-gradient-to-br from-primary/5 to-accent/5">
                  <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                    Connect to a sandbox to start streaming
                  </div>
                </div>
              </div>
            </div>

            <div className="z-10 text-center">
               <p className="text-sm text-muted-foreground">Waiting for sandbox connection...</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
