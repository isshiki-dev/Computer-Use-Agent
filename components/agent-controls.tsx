import { Button } from '@/components/ui/button'
import { Play, Square, Pause, RotateCcw, Settings } from 'lucide-react'

interface AgentControlsProps {
  status: 'idle' | 'running' | 'paused'
  onControl: (action: 'start' | 'stop' | 'pause') => void
}

export function AgentControls({ status, onControl }: AgentControlsProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {status === 'idle' && (
          <Button
            onClick={() => onControl('start')}
            className="gap-2"
          >
            <Play className="h-4 w-4" />
            Start Agent
          </Button>
        )}

        {status === 'running' && (
          <>
            <Button
              onClick={() => onControl('pause')}
              variant="secondary"
              className="gap-2"
            >
              <Pause className="h-4 w-4" />
              Pause
            </Button>
            <Button
              onClick={() => onControl('stop')}
              variant="destructive"
              className="gap-2"
            >
              <Square className="h-4 w-4" />
              Stop
            </Button>
          </>
        )}

        {status === 'paused' && (
          <>
            <Button
              onClick={() => onControl('start')}
              className="gap-2"
            >
              <Play className="h-4 w-4" />
              Resume
            </Button>
            <Button
              onClick={() => onControl('stop')}
              variant="destructive"
              className="gap-2"
            >
              <Square className="h-4 w-4" />
              Stop
            </Button>
          </>
        )}

        <Button
          variant="outline"
          size="icon"
          disabled={status === 'running'}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">4/7</span> steps completed
        </div>
        <Button variant="ghost" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
