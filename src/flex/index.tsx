import * as React from 'react'
import join from '../utils/join'
import CONFIG from '../config'

interface FlexProps extends React.PropsWithChildren<{
  className?: string
  ai?: 'center' | 'start' | 'end'
  jc?: 'between' | 'center' | 'start' | 'end'
  column?: boolean
}> {}

const Flex = React.forwardRef(function Flex({
  className,
  ai,
  jc,
  column,
  children
}: FlexProps, ref: any) {
  const styles = CONFIG.flex || {}
  return (
    <div
      className={
        join(
          column ? styles.uiFlexColumn : styles.uiFlex,
          ai && styles[`ai${ ai }`],
          jc && styles[`jc${ jc }`],
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
