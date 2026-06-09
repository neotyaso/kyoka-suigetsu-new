import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PUT(
  req: Request, 
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idStr } = await context.params
    const id = Number(idStr)
    const body = await req.json()
    const updatedNews = await prisma.news.update({
      where: { id },
      data: {
        title: body.title,
        content: body.content,
        date: new Date().toISOString().split('T')[0]
      },
    })
    return NextResponse.json({ success: true, news: updatedNews })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'お知らせの更新に失敗しました' }, { status: 500 })
  }
}

export async function DELETE(
  req: Request, 
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idStr } = await context.params
    const id = Number(idStr)
    await prisma.news.delete({ where: { id } })
    return NextResponse.json({ success: true, message: '削除しました' })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'お知らせの削除に失敗しました' }, { status: 500 })
  }
}