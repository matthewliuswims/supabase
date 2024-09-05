import { AlertTriangle } from 'lucide-react'
import { Column } from 'react-data-grid'

import { Broadcast, DatabaseChanges, Presence } from 'icons'
import { cn } from 'ui'
import type { LogData, PreviewLogData } from './Messages.types'
import { RowLayout } from './MessagesFormatters'
import { isErrorLog } from './MessagesTable'

const ICONS = {
  PRESENCE: <Presence size="xlarge" />,
  BROADCAST: <Broadcast size="xlarge" />,
  POSTGRES: <DatabaseChanges size="xlarge" />,
  SYSTEM: <AlertTriangle size="20" strokeWidth={1} />,
}

export const ColumnRenderer: Column<LogData, unknown>[] = [
  {
    name: 'timestamp-with-truncated-text',
    key: 'main-column',
    renderCell: (data: { row: PreviewLogData }) => {
      const type = data.row.message as keyof typeof ICONS

      return (
        <RowLayout>
          <div
            className={cn(
              'flex justify-center items-center min-w-[24px]',
              isErrorLog(data.row) ? 'text-warning-600' : 'text-green-900'
            )}
          >
            {ICONS[type]}
          </div>
          <span className={cn('font-mono', isErrorLog(data.row) ? '!text-warning-600' : '')}>
            {new Date(data.row.timestamp).toISOString()}
          </span>
          <span
            className={cn('truncate font-mono', isErrorLog(data.row) ? '!text-warning-600' : '')}
          >
            {JSON.stringify(data.row.metadata)}
          </span>
        </RowLayout>
      )
    },
  },
]
