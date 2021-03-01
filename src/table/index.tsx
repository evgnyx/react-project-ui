import * as React from 'react'
import { getStyles } from '../config'
import { Fn } from '../types'
import Table from './table'

interface CommonProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface TableProps extends CommonProps {}
export interface RowProps extends CommonProps {}
export interface CellProps extends CommonProps {
  width?: number
}

interface CellParams {
  title?: string
  width?: number
  dataKey?: string
  formatValue?: Fn
  head?: React.ComponentType<any>
  component?: React.ComponentType<any>
}

interface TableLayoutProps {
  className?: string
  columns: CellParams[]
  rows: { [key: string]: any }[]
}

function TableLayout({
  className,
  columns,
  rows,
}: TableLayoutProps) {
  const styles = getStyles('table')
  return (
    <Table className={ className }>
      <Table.Row className={ styles.uiTableHead }>
        { columns.map((cell, cellIndex) => (
          <Table.Cell
            className={ styles.uiTableHeadCell }
            width={ cell.width }
            key={ cellIndex }
          >
            { cell.title }
            { cell.head &&
              <cell.head />
            }
          </Table.Cell>
        ))
        }
      </Table.Row>

      { rows.map((row, rowIndex) => (
        <Table.Row className={ styles.uiTableDataRow } key={ rowIndex }>
          { columns.map((col, colIndex) => (
            <Table.Cell className={ styles.uiTableDataCell } width={ col.width } key={ colIndex }>
              { col.dataKey &&
                col.formatValue ? col.formatValue(row[col.dataKey]) : row[col.dataKey!]
              }
              { col.component &&
                <col.component data={ row } params={ col } />
              }
            </Table.Cell>
          ))
          }
        </Table.Row>
      ))
      }
    </Table>
  )
}

export default TableLayout
