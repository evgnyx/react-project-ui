import * as React from 'react'
import join from '../utils/join'
import { getStyles } from '../config'

export interface TextProps
  extends React.HTMLAttributes<HTMLElement> {
  variant?: string
  size?: string | number
  weight?: string | number
  color?: string
  align?: 'center' | 'right'
  as?: string | React.FunctionComponent<any>
}

const Text = React.forwardRef(function Text({
  className,
  variant,
  size,
  weight,
  color,
  align,
  as = 'p',
  ...props
}: TextProps, ref: any) {
  const styles = getStyles('text')
  const Tag = as as any
  const classlist = React.useMemo(() => join(
    styles.uiText,
    variant && styles[variant],
    size && styles[`fs${ size }`],
    weight && styles[`w${ weight }`],
    color && styles[`c${ color }`],
    align && styles[align],
    className
  ), [variant, size, weight, color, align, className])

  return (
    <Tag
      className={ classlist }
      { ...props }
      ref={ ref }
    />
  )
})

export default Text
