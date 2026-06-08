import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const newsList = await prisma.news.findMany({ orderBy: { id: 'desc' } })
    return NextResponse.json(newsList)
  } catch (error) {
    console.error("お知らせ取得エラー:", error)
    return NextResponse.json({ error: 'お知らせの取得に失敗しました' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const newPost = await prisma.news.create({
      data: {
        title: body.title,
        content: body.content,
        date: new Date().toISOString().split('T')[0]
      }
    })
    console.log('新しくお知らせが投稿されました:', newPost)
    return NextResponse.json({ success: true, news: newPost })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'お知らせの投稿に失敗しました' }, { status: 500 })
  }
}