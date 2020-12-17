import * as React from 'react'
import join from '../utils/join'
import CONFIG from '../config'

export interface TextProps extends React.PropsWithChildren<{
  className?: string
  size?: string | number
  width?: string | number
  color?: string
  variant?: string
  as?: string | React.FunctionComponent<any>
}> {}

const Text = React.forwardRef(function Text({
  className,
  size,
  width,
  color,
  variant,
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
          color && styles[`c${ color }`],
          variant && styles[variant],
          className
        )
      }
      { ...props }
      ref={ ref }
    />
  )
})

export default Text
