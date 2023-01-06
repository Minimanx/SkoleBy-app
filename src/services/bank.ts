import { Transaction } from '@prisma/client'
import prisma from '../context'

export const getAllTransactionsByUserId = async (userId: number) => {
  const transactions = await prisma.transaction.findMany({
    where: { userId: userId },
    orderBy: { createdAt: 'desc' },
  })
  if (!transactions || !transactions[0]) return 'No transactions found'
  return transactions
}

export const createTransaction = async (transaction: Transaction) => {
  return await prisma.transaction.create({ data: transaction })
}

export const runPaySlipTransactions = async () => {
  const students = await prisma.user.findMany({
    where: { role: 'student' },
    include: { jobTitle: { include: { business: true } } },
  })

  const filteredStudents = students.filter(item => item.jobTitle)

  await prisma.$transaction(
    filteredStudents.map(item => {
      const decimalHoursWorked =
        (new Date(
          '1970-01-01T' + item.jobTitle?.business.closesAt + 'Z'
        ).getTime() -
          new Date(
            '1970-01-01T' + item.jobTitle?.business.opensAt + 'Z'
          ).getTime()) /
        (1000 * 60 * 60)

      return prisma.transaction.create({
        data: {
          title: `Løn overførsel fra ${item.jobTitle?.business.title}`,
          amount: 100 * decimalHoursWorked,
          userId: item.id,
        },
      })
    })
  )
}
