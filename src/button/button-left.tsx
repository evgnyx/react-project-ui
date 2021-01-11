import * as React from 'react'
import join from '../utils/join'
import { getStyles } from '../config'

function ButtonLeft({ className, ...props }: React.PropsWithChildren<any>) {
  const styles = getStyles('button')
  return (
    <span className={ join(styles.uiButtonLeft, className) } { ...props } />
  )
}

export default React.memo(ButtonLeft)
