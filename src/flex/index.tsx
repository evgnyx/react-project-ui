import * as React from 'react'
import join from '../utils/join'
import CONFIG from '../config'

interface FlexProps extends React.HTMLAttributes<any> {
  ai?: 'center' | 'start' | 'end'
  jc?: 'between' | 'center' | 'start' | 'end'
  column?: boolean
  as?: 'div' | 'form' | string | React.FunctionComponent<any>
}

const Flex = React.forwardRef(function Flex({
  className,
  ai,
  jc,
  column,
  as: Tag = 'div',
  ...props
}: FlexProps, ref: any) {
  const styles = CONFIG.flex || {}
  return (
    <Tag
      className={
        join(
          column ? styles.uiFlexColumn : styles.uiFlex,
          ai && styles[`ai${ ai }`],
          jc && styles[`jc${ jc }`],
          className
        )
      }
      ref={ ref }
      { ...props }
    />
  )
})

export default Flex
