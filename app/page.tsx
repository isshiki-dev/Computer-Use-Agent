'use client'

import { useState } from 'react'
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

  const handleAgentControl = (action: 'start' | 'stop' | 'pause') => {
    if (action === 'start') {
      setIsStarting(true)
      // Simulate fast E2B startup
      setTimeout(() => {
        setAgentStatus('running')
        setIsStarting(false)
      }, 500)
    } else if (action === 'stop') {
      setAgentStatus('idle')
    } else if (action === 'pause') {
      setAgentStatus('paused')
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
            <VncViewer selectedStep={selectedStep} />
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
            <SandboxStatus />
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
