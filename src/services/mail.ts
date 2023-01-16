import { Mail } from '@prisma/client'
import prisma from '../context'

export const getAllMailsByUserId = async (id: number) => {
  const mails = await prisma.mail.findMany({
    where: { userId: id },
    orderBy: { createdAt: 'desc' },
  })
  if (!mails || !mails[0]) return 'No mails found'
  return mails
}

export const createMail = async (mail: Mail) => {
  return await prisma.mail.create({ data: mail })
}
