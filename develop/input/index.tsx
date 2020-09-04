import * as React from 'react'
import { join } from '../tools'
import { getStyles } from '../config'


interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
}

const key = 'ui-input'

function Input({ className, ...props }: InputProps) {
  const classlist = React.useMemo(() => {
    const [styles, theme] = getStyles('input')
    return join(
      styles![key] || key,
      theme![key],
      className
    )
  }, [className])

  return (
    <input
      className={ classlist }
      { ...props }
    />
  )
}

export default React.memo(Input)
