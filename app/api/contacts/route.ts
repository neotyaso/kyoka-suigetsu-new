import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const newContact = await prisma.contact.create({
      data: {
        name: body.name,
        email: body.email,
        message: body.message,
        createdAt: new Date().toISOString(), 
      },
    })
    console.log('データベースにお問い合わせが記録されました:', newContact)
    return NextResponse.json({ success: true, contact: newContact })
  } catch (error: any) {
    console.error('お問い合わせ送信エラー:', error)
    return NextResponse.json({ error: 'お問い合わせの送信に失敗しました', details: error.message }, { status: 500 })
  }
}