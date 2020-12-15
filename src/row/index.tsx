import * as React from 'react'
import join from '../utils/join'
import CONFIG from '../config'
// import { Fn } from '../types'

interface RowProps extends React.PropsWithChildren<{
  className?: string
  jc?: 'between' | 'center' | 'start' | 'end'
}> {}

const Row = React.forwardRef(function Row({
  className,
  jc,
  children
}: RowProps, ref: any) {
  const styles = CONFIG.row || {}
  return (
    <div
      className={
        join(
          styles.uiRow,
          jc && styles[jc],
          className
        )
      }
      ref={ ref }
    >
      { children }
    </div>
  )
})

export default Row
