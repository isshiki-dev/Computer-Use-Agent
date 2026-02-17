import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const sandboxId = searchParams.get('sandboxId')

  if (!sandboxId) {
    return new Response('Missing sandboxId', { status: 400 })
  }

  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder()

      const sendEvent = (data: any) => {
        try {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`))
        } catch (e) {
          // Stream might be closed
        }
      }

      // Initial events
      sendEvent({ type: 'log', message: 'Connected to sandbox ' + sandboxId, timestamp: new Date().toISOString() })

      const interval = setInterval(() => {
        // Send random metrics
        const cpu = Math.floor(Math.random() * 30) + 20
        const memory = (Math.random() * 0.4 + 2.0).toFixed(1)

        sendEvent({
          type: 'status',
          cpu,
          memory,
          timestamp: new Date().toISOString()
        })

        // Occasionally send a log
        if (Math.random() > 0.8) {
          sendEvent({
            type: 'log',
            message: 'Agent processing next step...',
            timestamp: new Date().toISOString()
          })
        }
      }, 5000)

      req.signal.onabort = () => {
        clearInterval(interval)
        controller.close()
      }
    }
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    }
  })
}
