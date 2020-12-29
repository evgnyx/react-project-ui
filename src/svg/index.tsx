import * as React from 'react'
import join from '../utils/join'
import CONFIG from '../config'
// import { Fn } from '../types'

export interface SvgProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string
  size?: string
  color?: string
  name: string
}

const Svg = React.forwardRef(function Svg({
  className,
  size,
  color,
  name,
  ...props
}: SvgProps, ref: any) {
  const styles = CONFIG.svg || {}
  return (
    <span
      className={
        join(
          styles.uiSvg,
          size && styles[size] || styles.default,
          color && styles[color],
          className
        )
      }
      { ...props }
      ref={ ref }
    >
      <svg>
        <use href={ `#${ name }` } />
      </svg>
    </span>
  )
})

export default Svg
