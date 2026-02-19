'use client'

import { useState, useEffect, useRef } from 'react'
import { AgentHeader } from '@/components/agent-header'
import { VncViewer } from '@/components/vnc-viewer'
import { TaskFeed } from '@/components/task-feed'
import { ExecutionTimeline } from '@/components/execution-timeline'
import { AnnotationPanel } from '@/components/annotation-panel'
import { AgentControls } from '@/components/agent-controls'
import { SandboxStatus } from '@/components/sandbox-status'
import { toast } from 'sonner'
import { Menu, X, ChevronRight, ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function DashboardPage() {
  const [agentStatus, setAgentStatus] = useState<'idle' | 'running' | 'paused'>('idle')
  const [selectedStep, setSelectedStep] = useState<number | null>(null)
  const [isStarting, setIsStarting] = useState(false)

  // Responsive UI State
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true)
  const [mobileView, setMobileView] = useState('vnc') // 'vnc', 'steps', 'tasks'

  // Real E2B State
  const [sandboxId, setSandboxId] = useState<string | null>(null)
  const [vncUrl, setVncUrl] = useState<string | null>(null)
  const [metrics, setMetrics] = useState({ cpu: 0, memory: '0.0' })

  const eventSourceRef = useRef<EventSource | null>(null)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setLeftSidebarOpen(false)
        setRightSidebarOpen(false)
      } else {
        setLeftSidebarOpen(true)
        setRightSidebarOpen(true)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (sandboxId && agentStatus === 'running') {
      const es = new EventSource(`/api/events?sandboxId=${sandboxId}`)
      eventSourceRef.current = es

      es.onmessage = (event) => {
        const data = JSON.parse(event.data)
        if (data.type === 'status') {
          setMetrics({ cpu: data.cpu, memory: data.memory })
        } else if (data.type === 'log') {
          toast.info(data.message, {
             description: data.timestamp,
             icon: '🤖'
          })
        }
      }

      es.onerror = () => {
        console.error('SSE connection failed')
        es.close()
      }

      return () => {
        es.close()
        eventSourceRef.current = null
      }
    }
  }, [sandboxId, agentStatus])

  const handleAgentControl = async (action: 'start' | 'stop' | 'pause') => {
    if (action === 'start') {
      setIsStarting(true)
      try {
        const res = await fetch('/api/sandbox', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'start' }),
        })
        const data = await res.json()

        if (!res.ok) throw new Error(data.error || 'Failed to start sandbox')

        setSandboxId(data.sandboxId)
        setVncUrl(data.vncUrl)
        setAgentStatus('running')
        toast.success('Sandbox started', {
          description: `ID: ${data.sandboxId}`
        })
      } catch (e: any) {
        console.error(e)
        if (e.message.includes('API key') || e.message.includes('Unauthorized')) {
           toast.warning('E2B_API_KEY missing, using demo mode', {
             description: 'Start a sandbox for real integration'
           })
           setSandboxId('demo_' + Math.random().toString(36).substring(7))
           setVncUrl('https://demo.vnc.e2b.dev')
           setAgentStatus('running')
        } else {
           toast.error('Error: ' + e.message)
        }
      } finally {
        setIsStarting(false)
      }
    } else if (action === 'stop') {
      try {
        await fetch('/api/sandbox', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'stop', sandboxId }),
        })
        setAgentStatus('idle')
        setSandboxId(null)
        setVncUrl(null)
        setMetrics({ cpu: 0, memory: '0.0' })
        toast.info('Sandbox stopped')
      } catch (e) {
        toast.error('Failed to stop sandbox')
      }
    } else if (action === 'pause') {
      setAgentStatus('paused')
      toast.info('Agent paused')
    }
  }

  return (
    <div className="flex h-screen flex-col bg-background overflow-hidden">
      <AgentHeader status={isStarting ? 'idle' : agentStatus} />

      {/* Mobile Navigation Tabs */}
      <div className="flex lg:hidden border-b border-border bg-card">
        <button
          onClick={() => setMobileView('vnc')}
          className={cn(
            "flex-1 py-3 text-xs font-medium border-b-2 transition-colors",
            mobileView === 'vnc' ? "border-primary text-primary" : "border-transparent text-muted-foreground"
          )}
        >
          Stream
        </button>
        <button
          onClick={() => setMobileView('steps')}
          className={cn(
            "flex-1 py-3 text-xs font-medium border-b-2 transition-colors",
            mobileView === 'steps' ? "border-primary text-primary" : "border-transparent text-muted-foreground"
          )}
        >
          Steps
        </button>
        <button
          onClick={() => setMobileView('tasks')}
          className={cn(
            "flex-1 py-3 text-xs font-medium border-b-2 transition-colors",
            mobileView === 'tasks' ? "border-primary text-primary" : "border-transparent text-muted-foreground"
          )}
        >
          Tasks
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Sidebar - Execution Timeline */}
        <aside className={cn(
          "absolute lg:relative z-30 h-full border-r border-border bg-card flex flex-col transition-all duration-300",
          leftSidebarOpen ? "w-80 translate-x-0" : "w-0 -translate-x-full lg:w-0 lg:translate-x-0 lg:opacity-0 overflow-hidden",
          "lg:translate-x-0 lg:opacity-100" // Desktop overrides
        )}>
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-foreground">Execution Steps</h2>
              <p className="text-xs text-muted-foreground mt-1">Step-by-step visualization</p>
            </div>
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setLeftSidebarOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <ExecutionTimeline
            selectedStep={selectedStep}
            onSelectStep={setSelectedStep}
            agentStatus={agentStatus}
          />
        </aside>

        {/* Main Content Area */}
        <main className={cn(
          "flex-1 flex flex-col overflow-hidden transition-all duration-300",
          mobileView !== 'vnc' && "hidden lg:flex"
        )}>
          {/* VNC Viewer */}
          <div className="flex-1 p-2 lg:p-4 overflow-hidden relative">
            {/* Desktop Toggle Buttons */}
            <button
              onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
              className="hidden lg:flex absolute left-6 top-1/2 -translate-y-1/2 z-40 h-8 w-4 bg-border/50 hover:bg-border items-center justify-center rounded-r transition-colors"
            >
              {leftSidebarOpen ? <ChevronLeft className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
            </button>

            <VncViewer selectedStep={selectedStep} vncUrl={vncUrl} />

            <button
              onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
              className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 z-40 h-8 w-4 bg-border/50 hover:bg-border items-center justify-center rounded-l transition-colors"
            >
              {rightSidebarOpen ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
            </button>
          </div>

          {/* Agent Controls */}
          <div className="border-t border-border bg-card p-4">
            <AgentControls
              status={isStarting ? 'running' : agentStatus}
              onControl={handleAgentControl}
            />
          </div>
        </main>

        {/* Mobile Steps View */}
        <div className={cn(
          "lg:hidden flex-1 overflow-auto bg-background",
          mobileView !== 'steps' && "hidden"
        )}>
          <ExecutionTimeline
            selectedStep={selectedStep}
            onSelectStep={setSelectedStep}
            agentStatus={agentStatus}
          />
          <div className="p-4 border-t border-border">
             <AnnotationPanel selectedStep={selectedStep} />
          </div>
        </div>

        {/* Mobile Tasks View */}
        <div className={cn(
          "lg:hidden flex-1 flex flex-col bg-background",
          mobileView !== 'tasks' && "hidden"
        )}>
          <div className="flex-1 overflow-hidden flex flex-col">
            <TaskFeed agentStatus={agentStatus} />
          </div>
          <div className="border-t border-border bg-card">
            <SandboxStatus
              sandboxId={sandboxId}
              cpu={metrics.cpu}
              memory={metrics.memory}
            />
          </div>
        </div>

        {/* Right Sidebar - Task Feed & Sandbox Status (Desktop) */}
        <aside className={cn(
          "absolute right-0 lg:relative z-30 h-full border-l border-border bg-card flex flex-col transition-all duration-300",
          rightSidebarOpen ? "w-96 translate-x-0" : "w-0 translate-x-full lg:w-0 lg:translate-x-0 lg:opacity-0 overflow-hidden",
          "lg:translate-x-0 lg:opacity-100 hidden lg:flex" // Desktop overrides
        )}>
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-foreground">Live Task Feed</h2>
                <p className="text-xs text-muted-foreground mt-1">Real-time agent processing</p>
              </div>
              <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setRightSidebarOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <TaskFeed agentStatus={agentStatus} />
          </div>

          {/* Sandbox Status */}
          <div className="border-t border-border">
            <SandboxStatus
              sandboxId={sandboxId}
              cpu={metrics.cpu}
              memory={metrics.memory}
            />
          </div>

          {/* Annotation Panel */}
          <div className="border-t border-border">
            <AnnotationPanel selectedStep={selectedStep} />
          </div>
        </aside>
      </div>
    </div>
  )
}
