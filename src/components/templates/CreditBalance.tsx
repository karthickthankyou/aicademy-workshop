import { ShowCreditBalance } from '../organisms/ShowCreditBalance'
import { ListTransactions } from './ListTransactions'

export const CreditBalance = () => {
  return (
    <div className="font-sans space-y-8">
      <ShowCreditBalance className="mb-6" />

      <ListTransactions />
    </div>
  )
}
