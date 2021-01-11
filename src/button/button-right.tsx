import * as React from 'react'
import join from '../utils/join'
import { getStyles } from '../config'

function ButtonRight({ className, ...props }: React.PropsWithChildren<any>) {
  const styles = getStyles('button')
  return (
    <span className={ join(styles.uiButtonRight, className) } { ...props } />
  )
}

export default React.memo(ButtonRight)
