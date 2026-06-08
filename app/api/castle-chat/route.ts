import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { message } = await req.json()
    const pythonApiUrl = process.env.PYTHON_API_URL || 'http://127.0.0.1:8080'
    
    const pythonResponse = await fetch(`${pythonApiUrl}/api/ai/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    })

    if (!pythonResponse.ok) {
      return NextResponse.json({ error: 'AI案内人が居眠りしているようです' }, { status: 500 })
    }

    const result = await pythonResponse.json()
    return NextResponse.json(result)
  } catch (error) {
    console.error('Chat Error:', error)
    return NextResponse.json({ error: '通信に失敗しました' }, { status: 500 })
  }
}