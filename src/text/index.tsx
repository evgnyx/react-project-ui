import * as React from 'react'
import join from '../utils/join'
import CONFIG from '../config'

export interface TextProps extends React.PropsWithChildren<{
  className?: string
  size?: string | number
  width?: string | number
  as?: string | React.FunctionComponent<any>
}> {}

const Text = React.forwardRef(function Text({
  className,
  size,
  width,
  as = 'p',
  ...props
}: TextProps, ref: any) {
  const styles = CONFIG.text || {}
  const Tag = as as any
  return (
    <Tag
      className={
        join(
          styles.uiText,
          size && styles[`fs${ size }`],
          width && styles[`w${ width }`],
          className
        )
      }
      { ...props }
      ref={ ref }
    />
  )
})

export default Text
