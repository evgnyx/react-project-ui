import * as React from 'react'
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom'
import Text, { TextProps } from '../text'
import join from '../utils/join'
import CONFIG from '../config'

export interface LinkProps<S = unknown> extends RouterLinkProps<S>, React.PropsWithChildren<TextProps> {
  href?: string
}

const Link = React.forwardRef(function Link({
  className,
  ...props
}: LinkProps, ref: any) {
  const styles = CONFIG.text || {}

  return (
    <Text
      className={
        join(
          styles.uiLink,
          className
        )
      }
      as={ props.to ? RouterLink : 'a' }
      { ...props }
      ref={ ref }
    />
  )
})

export default Link
