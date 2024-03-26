import { trpcServer } from '@/trpc/clients/server'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../atoms/table'
import { format } from 'date-fns'
import { cn } from '@/util/styles'

export const ListTransactions = async () => {
  const myCreditTransactions =
    await trpcServer.creditBalance.myCreditTransactions.query()

  return (
    <Table>
      <TableCaption>A list of your recent credit transactions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Notes</TableHead>
          <TableHead className="text-center">Model</TableHead>
          <TableHead className="text-right">Prompt Tokens</TableHead>
          <TableHead className="text-right">Completion Tokens</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {myCreditTransactions.map(
          ({
            id,
            amount,
            createdAt,
            notes,
            completionTokens,
            promptTokens,
            model,
          }) => (
            <TableRow key={id}>
              <TableCell>{id}</TableCell>

              <TableCell>
                <div>{format(new Date(createdAt), 'PP')}</div>
                <div className="text-xs">
                  {format(new Date(createdAt), 'p')}
                </div>
              </TableCell>
              <TableCell className="max-w-xs">{notes}</TableCell>
              <TableCell className="max-w-xs text-center">
                {model || '-'}
              </TableCell>
              <TableCell className="max-w-xs text-right">
                {promptTokens}
              </TableCell>
              <TableCell className="max-w-xs text-right">
                {completionTokens}
              </TableCell>

              <TableCell
                className={cn(
                  'text-2xl text-right',
                  amount > 0 ? 'text-green-700' : 'text-red-700',
                )}
              >
                {amount}
              </TableCell>
            </TableRow>
          ),
        )}
      </TableBody>
    </Table>
  )
}
