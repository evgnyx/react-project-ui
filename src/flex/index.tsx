import * as React from 'react'
import join from '../utils/join'
import CONFIG from '../config'

interface FlexProps extends React.PropsWithChildren<{
  className?: string
  ai?: 'center' | 'start' | 'end'
  jc?: 'between' | 'center' | 'start' | 'end'
  row?: boolean
}> {}

const Flex = React.forwardRef(function Flex({
  className,
  ai,
  jc,
  row,
  children
}: FlexProps, ref: any) {
  const styles = CONFIG.flex || {}
  return (
    <div
      className={
        join(
          styles.uiFlex,
          ai && styles[`ai${ ai }`],
          jc && styles[`jc${ jc }`],
          row && styles.row,
          className
        )
      }
      ref={ ref }
    >
      { children }
    </div>
  )
})

export default Flex
