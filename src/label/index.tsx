import * as React from 'react'
import { join } from '../tools'
import { getStyles } from '../config'


interface LabelProps extends React.HTMLAttributes<HTMLLabelElement> {
}

const key = 'ui-label'

function Label({ className, ...props }: LabelProps) {
  const classlist = React.useMemo(() => {
    const [styles, theme] = getStyles('label')
    return join(
      styles![key] || key,
      theme![key],
      className
    )
  }, [className])

  return (
    <label
      className={ classlist }
      { ...props }
    />
  )
}

export default React.memo(Label)
