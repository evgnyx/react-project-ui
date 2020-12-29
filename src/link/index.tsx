import * as React from 'react'
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom'
import Text, { TextProps } from '../text'
import join from '../utils/join'
import { getStyles } from '../config'

export interface LinkProps extends TextProps {
  to?: RouterLinkProps['to']
}

const Link = React.forwardRef(function Link({
  className,
  ...props
}: LinkProps, ref: any) {
  const styles = getStyles('text')
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
