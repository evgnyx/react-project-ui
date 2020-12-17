import * as React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Text, { TextProps } from '../text'
import join from '../utils/join'
import CONFIG from '../config'

export interface LinkProps extends React.PropsWithChildren<TextProps> {
  to?: string
  href?: string
}

const Link = React.forwardRef(function Link({
  className,
  to,
  href,
  ...props
}: LinkProps, ref: any) {
  const styles = CONFIG.link || {}

  return (
    <Text
      className={
        join(
          styles.uiLink,
          className
        )
      }
      as={ to ? RouterLink : 'a' }
      { ...props }
      ref={ ref }
    />
  )
})

export default Link
