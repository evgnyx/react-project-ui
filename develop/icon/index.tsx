import * as React from 'react'
import { join } from '../tools'
import { getStyles } from '../config'
// import './style.styl'


const key = 'ui-icon'

interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string
}

function Icon({
  className,
  name,
  ...props
}: IconProps) {
  const [classlist, iconName] = React.useMemo(() => {
    const [styles, theme, conf] = getStyles('icon')
    return [
      join(
        styles![key] || key,
        theme![key],
        className,
      ),
      `${ conf.path! ? conf.path : '' }#${ name }`
    ]
  }, [className])

  return (
    <i className={ classlist } { ...props }>
      <svg role="img" focusable="false">
        <use href={ iconName } />
      </svg>
    </i>
  )
}

export default React.memo(Icon)
