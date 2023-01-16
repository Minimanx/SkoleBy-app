import { JobApplication, JobListing, JobTitle } from '@prisma/client'
import prisma from '../context'

export const getAllJobListings = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { class: true },
  })
  if (!user) return 'No user found'

  const jobListings = await prisma.jobListing.findMany({
    where: { business: { schoolId: user.class.schoolId } },
    include: { business: true },
  })
  if (!jobListings || !jobListings[0]) return 'No job listings found'
  return jobListings
}

export const getJobListingById = async (id: number, userId: number) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { class: true },
  })
  if (!user) return 'No user found'

  const jobListing = await prisma.jobListing.findFirst({
    where: { id: id },
    include: { business: true },
  })
  if (!jobListing || jobListing.business.schoolId !== user.class.schoolId)
    return 'No job listing found'
  return jobListing
}

export const createJobListing = async (
  jobListing: JobListing,
  userId: number
) => {
  const user = await prisma.user.findFirst({
    where: { id: userId },
    include: { class: { include: { school: true } } },
  })
  if (!user || user.role === 'student') return 'Unauthorized'

  const business = await prisma.business.findFirst({
    where: { id: jobListing.businessId },
  })
  if (!business || business.schoolId !== user.class.schoolId)
    return 'Unauthorized'

  return await prisma.jobListing.create({ data: jobListing })
}

export const getAllJobTitles = async () => {
  const jobTitles = await prisma.jobTitle.findMany()
  if (!jobTitles || !jobTitles[0]) return 'No job listings found'
  return jobTitles
}

export const createJobTitle = async (jobTitle: JobTitle) => {
  return await prisma.jobTitle.create({ data: jobTitle })
}

// export const getAllJobApplicationsByJobListingId = async () => {
//   const jobTitles = await prisma.jobTitle.findMany()
//   if (!jobTitles || !jobTitles[0]) return 'No job listings found'
//   return jobTitles
// }

export const createJobApplication = async (jobApplication: JobApplication) => {
  return await prisma.jobApplication.create({ data: jobApplication })
}
