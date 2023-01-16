import { Business } from '@prisma/client'
import prisma from '../context'

export const getAllBusinesses = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { class: true },
  })
  if (!user) return 'No user found'

  const businesses = await prisma.business.findMany({
    where: { schoolId: user.class.schoolId },
  })
  if (!businesses || !businesses[0]) return 'No businesses found'
  return businesses
}

export const getBusinessById = async (id: number, userId: number) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { class: true },
  })
  if (!user) return 'No user found'

  const business = await prisma.business.findFirst({
    where: { id: id },
  })
  if (!business || business.schoolId !== user.class.schoolId)
    return 'No business found'
  return business
}

export const createBusiness = async (business: Business, userId: number) => {
  const user = await prisma.user.findFirst({
    where: { id: userId },
    include: { class: { include: { school: true } } },
  })
  if (!user || user.role === 'student') return 'Unauthorized'

  return await prisma.business.create({
    data: { ...business, schoolId: user.class.schoolId },
  })
}
