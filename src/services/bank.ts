import { Business, JobTitle, Transaction, User } from '@prisma/client'
import prisma from '../context'

export const getAllTransactionsByUserId = async (userId: number) => {
  const transactions = await prisma.transaction.findMany({
    where: { userId: userId },
    orderBy: { createdAt: 'desc' },
  })
  if (!transactions || !transactions[0]) return 'No transactions found'
  return transactions
}

export const createTransaction = async (
  transaction: Transaction,
  userId: number
) => {
  if (transaction.amount >= 0) return 'Cannot withdraw that amount'
  const user = await prisma.user.findFirst({
    where: { id: userId },
    include: { class: { include: { school: true } } },
  })
  if (!user || user.role === 'student') return 'Unauthorized'

  const student = await prisma.user.findFirst({
    where: { id: transaction.userId },
    include: { class: { include: { school: true } } },
  })
  if (!student || student.class.schoolId !== user.class.schoolId)
    return 'Unauthorized'

  return await prisma.transaction.create({ data: transaction })
}

export const runPaySlipTransactions = async () => {
  const students = await prisma.user.findMany({
    where: { role: 'student' },
    include: { jobTitle: { include: { business: true } } },
  })

  const filteredStudents = students.filter(item => item.jobTitle) as (User & {
    jobTitle: JobTitle & {
      business: Business
    }
  })[]

  await prisma.$transaction(
    filteredStudents.flatMap(item => {
      const decimalHoursWorked =
        (new Date(
          '1970-01-01T' + item.jobTitle?.business.closesAt + 'Z'
        ).getTime() -
          new Date(
            '1970-01-01T' + item.jobTitle?.business.opensAt + 'Z'
          ).getTime()) /
        (1000 * 60 * 60)

      return [
        prisma.transaction.create({
          data: {
            title: `Løn overførsel fra ${item.jobTitle.business.title}`,
            amount: 100 * decimalHoursWorked,
            userId: item.id,
          },
        }),
        prisma.mail.create({
          data: {
            title: `Lønseddel fra ${item.jobTitle.business.title}`,
            from: item.jobTitle.business.title,
            body: `Du har modtaget ${100 * decimalHoursWorked} kroner fra ${
              item.jobTitle.business.title
            }`,
            userId: item.id,
          },
        }),
      ]
    })
  )
}
