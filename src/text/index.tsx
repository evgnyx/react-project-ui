import * as React from 'react'
import join from '../utils/join'
import CONFIG from '../config'

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  className?: string
  size?: string | number
  weight?: string | number
  color?: string
  variant?: string
  as?: string | React.FunctionComponent<any>
}

const Text = React.forwardRef(function Text({
  className,
  size,
  weight,
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
          variant && styles[variant],
          size && styles[`fs${ size }`],
          weight && styles[`w${ weight }`],
          color && styles[`c${ color }`],
          className
        )
      }
      { ...props }
      ref={ ref }
    />
  )
})

export default Text
