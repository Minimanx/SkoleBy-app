import { NewsPost } from '@prisma/client'
import prisma from '../context'

export const getAllNewsPosts = async (id: number) => {
  const newsPosts = await prisma.newsPost.findMany({ where: { userId: id } })
  if (!newsPosts || !newsPosts[0]) return 'No news posts found'
  return newsPosts
}

export const createNewsPost = async (newsPost: NewsPost) => {
  return await prisma.newsPost.create({ data: newsPost })
}
