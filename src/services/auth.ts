import prisma from '../context'
import { bcryptCompareAsync } from '../utils/bcryptUtils'
import { getSchoolData } from './uniLoginApi'

export const login = async (email: string, password: string) => {
  const user = await prisma.user.findFirst({
    where: { email: email.toLowerCase() },
  })

  if (!user || !(await bcryptCompareAsync(password, user.password))) {
    return 'Invalid email or password.'
  }

  return user
}

// export const registerSchool = async (email: string) => {
//   const result = getSchoolData(email)
//   if (typeof result === 'string') return result

//   const prismaPromises = []

//   const school = await prisma.school.findFirst({
//     where: { name: result.schoolName },
//   })
//   if (school) return 'This school is already registered'
//   prismaPromises.push(
//     prisma.school.create({ data: { name: result.schoolName } })
//   )
//   prismaPromises.push(
//     result.classes.map(i => {
//       return prisma.class.create({ data: { name: i.className } })
//     })
//   )

//   const transaction = prisma.$transaction(prismaPromises)
// }
