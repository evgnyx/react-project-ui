import * as React from 'react'
import join from '../utils/join'
import CONFIG from '../config'
// import { Fn } from '../types'

const Settings = {
  class: 'ui-svg',
}

interface SvgProps extends React.PropsWithChildren<{
  className?: string
  name: string
}> {}

const Svg = React.forwardRef(function Svg({
  className,
  name
}: SvgProps, ref: any) {
  const styles = CONFIG.svg || {}
  return (
    <span
      className={
        join(
          styles.uiSvg || Settings.class,
          className
        )
      }
      ref={ ref }
    >
      <svg>
        <use href={ `#${ name }` } />
      </svg>
    </span>
  )
})

export default Svg
