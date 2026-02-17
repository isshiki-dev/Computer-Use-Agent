import { Button } from '@/components/ui/button'
import { Play, Square, Pause, RotateCcw, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AgentControlsProps {
  status: 'idle' | 'running' | 'paused'
  onControl: (action: 'start' | 'stop' | 'pause') => void
}

export function AgentControls({ status, onControl }: AgentControlsProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        {status === 'idle' && (
          <Button
            onClick={() => onControl('start')}
            className="gap-2 px-3 sm:px-4 text-xs sm:text-sm h-8 sm:h-9"
          >
            <Play className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden min-[450px]:inline">Start Agent</span>
            <span className="min-[450px]:hidden">Start</span>
          </Button>
        )}

        {status === 'running' && (
          <>
            <Button
              onClick={() => onControl('pause')}
              variant="secondary"
              className="gap-2 px-3 sm:px-4 text-xs sm:text-sm h-8 sm:h-9"
            >
              <Pause className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden min-[450px]:inline">Pause</span>
            </Button>
            <Button
              onClick={() => onControl('stop')}
              variant="destructive"
              className="gap-2 px-3 sm:px-4 text-xs sm:text-sm h-8 sm:h-9"
            >
              <Square className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden min-[450px]:inline">Stop</span>
            </Button>
          </>
        )}

        {status === 'paused' && (
          <>
            <Button
              onClick={() => onControl('start')}
              className="gap-2 px-3 sm:px-4 text-xs sm:text-sm h-8 sm:h-9"
            >
              <Play className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden min-[450px]:inline">Resume</span>
            </Button>
            <Button
              onClick={() => onControl('stop')}
              variant="destructive"
              className="gap-2 px-3 sm:px-4 text-xs sm:text-sm h-8 sm:h-9"
            >
              <Square className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden min-[450px]:inline">Stop</span>
            </Button>
          </>
        )}

        <Button
          variant="outline"
          size="icon"
          disabled={status === 'running'}
          className="h-8 w-8 sm:h-9 sm:w-9"
        >
          <RotateCcw className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <div className="text-[10px] sm:text-xs text-muted-foreground whitespace-nowrap">
          <span className="font-medium text-foreground">4/7</span>
          <span className="hidden sm:inline"> steps completed</span>
          <span className="sm:hidden"> done</span>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9">
          <Settings className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </Button>
      </div>
    </div>
  )
}
