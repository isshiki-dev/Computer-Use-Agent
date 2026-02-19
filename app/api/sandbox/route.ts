import { Sandbox } from '@e2b/desktop'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { action, sandboxId } = body

    if (action === 'start') {
      // Start a new desktop sandbox
      const desktop = await Sandbox.create({
        apiKey: process.env.E2B_API_KEY,
      })

      // Start the VNC stream
      await desktop.stream.start()
      const vncUrl = desktop.stream.getUrl()

      return NextResponse.json({
        sandboxId: desktop.sandboxId,
        vncUrl: vncUrl,
        status: 'running',
      })
    }

    if (action === 'stop' && sandboxId) {
      try {
        const desktop = await Sandbox.connect(sandboxId, {
          apiKey: process.env.E2B_API_KEY,
        })
        await desktop.kill()
        return NextResponse.json({ status: 'idle' })
      } catch (e: any) {
        // If it fails to connect, it might already be dead
        return NextResponse.json({ status: 'idle', message: 'Sandbox not found or already closed' })
      }
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error: any) {
    console.error('E2B Sandbox API Error:', error)
    return NextResponse.json({
      error: error.message || 'Internal Server Error',
      details: error.toString()
    }, { status: 500 })
  }
}
