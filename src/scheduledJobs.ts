import * as cronjob from 'node-cron'
import { runPaySlipTransactions } from './services/bank'

export const initScheduledJobs = () => {
  const scheduledJobFunction = cronjob.schedule(
    '0 20 * * *',
    async () => {
      await runPaySlipTransactions()

      console.log('Scheduled job ran successfully')
    },
    { timezone: 'Europe/Copenhagen' }
  )

  scheduledJobFunction.start()
}
