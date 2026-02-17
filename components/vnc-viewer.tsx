import { Monitor, Maximize2, ExternalLink } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface VncViewerProps {
  selectedStep: number | null
  vncUrl?: string | null
}

export function VncViewer({ selectedStep, vncUrl }: VncViewerProps) {
  return (
    <Card className="h-full flex flex-col bg-black border-border overflow-hidden">
      <div className="flex items-center justify-between px-3 lg:px-4 py-2 lg:py-3 border-b border-border bg-card">
        <div className="flex items-center gap-2 overflow-hidden">
          <Monitor className="h-3.5 w-3.5 lg:h-4 lg:w-4 text-muted-foreground shrink-0" />
          <span className="text-xs lg:text-sm font-medium text-foreground truncate">
            {vncUrl ? 'Live VNC' : 'VNC Stream'}
          </span>
          <span className="hidden sm:inline text-[10px] lg:text-xs text-muted-foreground whitespace-nowrap">1920x1080 @ 60fps</span>
        </div>
        <div className="flex items-center gap-1 lg:gap-2">
          {vncUrl && (
            <Button variant="outline" size="sm" className="h-7 lg:h-8 px-2 lg:px-3 gap-1 lg:gap-2 text-[10px] lg:text-xs" asChild>
              <a href={vncUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3 w-3" />
                <span className="hidden sm:inline">Open External</span>
                <span className="sm:hidden">Open</span>
              </a>
            </Button>
          )}
          <Button variant="ghost" size="sm" className="h-7 w-7 lg:h-8 lg:w-8 p-0">
            <Maximize2 className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 relative bg-gradient-to-br from-background to-muted/20 flex items-center justify-center p-2 sm:p-4 lg:p-8 overflow-hidden">
        {vncUrl ? (
          <div className="w-full h-full bg-[#0a0a0a] rounded-lg border border-border/50 flex flex-col items-center justify-center relative overflow-hidden p-4">
             <div className="text-center space-y-2 lg:space-y-4 max-w-full">
                <div className="w-12 h-12 lg:w-20 lg:h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto animate-pulse">
                  <Monitor className="h-6 w-6 lg:h-10 lg:w-10 text-primary" />
                </div>
                <div className="px-2">
                  <h3 className="text-sm lg:text-lg font-medium text-foreground">Streaming Sandbox</h3>
                  <p className="text-[10px] lg:text-sm text-muted-foreground mt-1 max-w-md mx-auto line-clamp-2">
                    Secure connection established via E2B. Agent ready for computer use.
                  </p>
                </div>
                <div className="w-full max-w-[200px] sm:max-w-md mx-auto">
                  <code className="block text-[8px] lg:text-xs bg-muted p-1 lg:p-2 rounded border border-border text-primary font-mono truncate">
                    {vncUrl}
                  </code>
                </div>
             </div>

             {selectedStep !== null && (
                <div className="absolute top-2 right-2 lg:top-4 lg:right-4 bg-primary/10 border border-primary/30 rounded-lg px-2 lg:px-3 py-1 lg:py-2">
                  <span className="text-[8px] lg:text-xs font-mono text-primary">Step {selectedStep}</span>
                </div>
              )}
          </div>
        ) : (
          <div className="w-full h-full bg-[#0a0a0a] rounded-lg border border-border/50 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-30 grayscale p-4 lg:p-8">
              <div className="absolute top-4 left-4 right-4 bg-card border border-border rounded-lg shadow-2xl h-32 lg:h-64">
                <div className="h-6 lg:h-10 bg-muted border-b border-border flex items-center px-2 lg:px-3 gap-1 lg:gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-red-500/80" />
                    <div className="w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-green-500/80" />
                  </div>
                </div>
              </div>
            </div>

            <div className="z-10 text-center px-4">
               <p className="text-[10px] lg:text-sm text-muted-foreground">Waiting for sandbox connection...</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
