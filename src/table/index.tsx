import * as React from 'react'
import join from '../utils/join'
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
  className?: string
}

type AnyProps = { [key: string]: any }

interface TableLayoutProps extends TableProps {
  className?: string
  columns: CellParams[]
  rows: { [key: string]: any }[]
  headCellProps?: AnyProps
  dataRowProps?: AnyProps
}

function TableLayout({
  className,
  columns,
  rows,
  headCellProps,
  dataRowProps,
  ...props
}: TableLayoutProps) {
  const styles = getStyles('table')
  const headRow = React.useMemo(() => (
    <Table.Row
      className={ styles.uiTableHead }
      data-ui="head"
    >
      { columns.map((cell, cellIndex) => (
        <Table.Cell
          className={ join(styles.uiTableHeadCell, cell.className) }
          width={ cell.width }
          data-ui="head-cell"
          key={ cellIndex }
        >
          { renderCell(cell, null, headCellProps) }
        </Table.Cell>
      ))
      }
    </Table.Row>
  ), [columns, headCellProps])

  const layout = React.useMemo(() => {
    const onClick = dataRowProps && dataRowProps.onClick ? dataRowProps.onClick : undefined
    return (
      rows.map((row, rowIndex) => (
        <Table.Row
          className={ styles.uiTableDataRow }
          data-ui="row"
          onClick={ onClick ? () => onClick(row, rowIndex) : undefined }
          key={ rowIndex }
        >
          { columns.map((col, colIndex) => (
            <Table.Cell
              className={ join(styles.uiTableDataCell, col.className) }
              width={ col.width }
              data-ui="cell"
              key={ colIndex }
            >
              { renderCell(col, row) }
            </Table.Cell>
          ))
          }
        </Table.Row>
      ))
    )
  }, [columns, rows])

  return (
    <Table
      className={ className }
      data-ui="table"
      { ...props }
    >
      { headRow }
      { layout }
    </Table>
  )
}

function renderCell(
  data: CellParams,
  row: TableLayoutProps['rows'][0] | null,
  headCellProps: AnyProps = {}
) {
  if (row) {
    if (data.component) {
      return <data.component data={ row } params={ data } />
    }
    if (data.dataKey) {
      return data.formatValue
        ? data.formatValue(row[data.dataKey])
        : row[data.dataKey]
    }
  }
  else {
    if (data.head) return <data.head params={ data } { ...headCellProps } />
    if (data.title) return data.title
  }
  return null
}

export default TableLayout
