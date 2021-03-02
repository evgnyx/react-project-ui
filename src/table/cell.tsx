import * as React from 'react'
import join from '../utils/join'
import { getStyles } from '../config'
import { CellProps } from './'

function Cell({
  className,
  width,
  children,
  ...props
}: CellProps) {
  const styles = getStyles('table')
  return (
    <div
      className={ join(styles.uiTableCell, className) }
      { ...props }
      style={
        width
          ? { minWidth: `${ width }%`, maxWidth: `${ width }%` }
          : undefined
      }
    >
      { children }
    </div>
  )
}

export default Cell
