import * as React from 'react'
import join from '../utils/join'
import { getStyles } from '../config'
import { TableProps } from './'
import Row from './row'
import Cell from './cell'

const Table = function Table({
  className,
  children,
  ...props
}: TableProps) {
  const styles = getStyles('table')
  return (
    <div
      className={ join(styles.uiTable, className) }
      { ...props }
    >
      { children }
    </div>
  )
}

;(Table as any).Cell = Cell
;(Table as any).Row = Row

export default Table as typeof Table & {
  Cell: typeof Cell
  Row: typeof Row
}
