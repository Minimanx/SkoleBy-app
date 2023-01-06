import prisma from '../context'

export const getUserByUserId = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { class: { include: { school: true } }, jobTitle: true },
  })
  if (!user) return 'No user found'
  return {
    name: user.name,
    class: user.class.name,
    school: user.class.school.name,
    funSchoolName: user.class.school.funName,
    jobTitle: user.jobTitle?.title,
  }
}
