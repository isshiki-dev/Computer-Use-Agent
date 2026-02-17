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

export default function DashboardPage() {
  const [agentStatus, setAgentStatus] = useState<'idle' | 'running' | 'paused'>('idle')
  const [selectedStep, setSelectedStep] = useState<number | null>(null)
  const [isStarting, setIsStarting] = useState(false)

  // Real E2B State
  const [sandboxId, setSandboxId] = useState<string | null>(null)
  const [vncUrl, setVncUrl] = useState<string | null>(null)
  const [metrics, setMetrics] = useState({ cpu: 0, memory: '0.0' })

  const eventSourceRef = useRef<EventSource | null>(null)

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
        // Fallback for demonstration if API key is missing
        if (e.message.includes('API key') || e.message.includes('Unauthorized')) {
           toast.warning('E2B_API_KEY missing, using demo mode', {
             description: 'Start a sandbox for real integration'
           })
           // Simulate demo mode
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

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Execution Timeline */}
        <aside className="w-80 border-r border-border bg-card flex flex-col overflow-hidden">
          <div className="p-4 border-b border-border">
            <h2 className="text-sm font-semibold text-foreground">Execution Steps</h2>
            <p className="text-xs text-muted-foreground mt-1">Step-by-step visualization</p>
          </div>
          <ExecutionTimeline
            selectedStep={selectedStep}
            onSelectStep={setSelectedStep}
            agentStatus={agentStatus}
          />
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* VNC Viewer */}
          <div className="flex-1 p-4 overflow-hidden">
            <VncViewer selectedStep={selectedStep} vncUrl={vncUrl} />
          </div>

          {/* Agent Controls */}
          <div className="border-t border-border bg-card p-4">
            <AgentControls
              status={isStarting ? 'running' : agentStatus}
              onControl={handleAgentControl}
            />
          </div>
        </main>

        {/* Right Sidebar - Task Feed & Sandbox Status */}
        <aside className="w-96 border-l border-border bg-card flex flex-col overflow-hidden">
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-border">
              <h2 className="text-sm font-semibold text-foreground">Live Task Feed</h2>
              <p className="text-xs text-muted-foreground mt-1">Real-time agent processing</p>
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
