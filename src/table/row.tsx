import * as React from 'react'
import join from '../utils/join'
import { getStyles } from '../config'
import { RowProps } from './'

function Row({
  className,
  children,
  ...props
}: RowProps) {
  const styles = getStyles('table')
  return (
    <div
      className={ join(styles.uiTableRow, className) }
      { ...props }
    >
      { children }
    </div>
  )
}

export default Row
