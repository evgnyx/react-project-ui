import * as React from 'react'
import join from '../utils/join'
import CONFIG from '../config'

interface TextProps extends React.PropsWithChildren<{
  className?: string
  size?: string | number
  as?: string
}> {}

const Text = React.forwardRef(function Text({
  className,
  size,
  as = 'p',
  children
}: TextProps, ref: any) {
  const styles = CONFIG.text || {}
  const Tag = as as any
  return (
    <Tag
      className={
        join(
          styles.uiText,
          size && styles[`fs${ size }`],
          className
        )
      }
      ref={ ref }
    >
      { children }
    </Tag>
  )
})

export default Text
