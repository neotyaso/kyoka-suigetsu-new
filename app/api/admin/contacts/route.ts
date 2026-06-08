import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const contacts = await prisma.contact.findMany({ orderBy: { id: 'desc' } })
    return NextResponse.json(contacts)
  } catch (error) {
    console.error("お問い合わせ取得エラー:", error)
    return NextResponse.json({ error: 'お問い合わせ一覧の取得に失敗しました' }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = Number(searchParams.get('id'))

    if (!id) return NextResponse.json({ error: 'IDが指定されていません' }, { status: 400 })

    const existingContact = await prisma.contact.findUnique({ where: { id } })
    if (!existingContact) return NextResponse.json({ error: '対象が見つかりません' }, { status: 404 })

    let nextCreatedAt = existingContact.createdAt
    if (nextCreatedAt.includes(',DONE')) {
      nextCreatedAt = nextCreatedAt.replace(',DONE', '')
      console.log(`お問い合わせ(ID: ${id})を【未対応】に戻しました`)
    } else {
      nextCreatedAt = `${nextCreatedAt},DONE` 
      console.log(`お問い合わせ(ID: ${id})を【対応済み】にしました`)
    }

    const updatedContact = await prisma.contact.update({
      where: { id },
      data: { createdAt: nextCreatedAt }
    })
    return NextResponse.json({ success: true, contact: updatedContact })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: '更新失敗' }, { status: 500 })
  }
}