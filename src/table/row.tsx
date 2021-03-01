import * as React from 'react'
import join from '../utils/join'
import { getStyles } from '../config'
import { RowProps } from './'

function Row({ className, children }: RowProps) {
  const styles = getStyles('table')
  return (
    <div className={ join(styles.uiTableRow, className) }>
      { children }
    </div>
  )
}

export default Row
