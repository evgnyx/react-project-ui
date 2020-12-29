import * as React from 'react'
import Text, { TextProps } from '../text'
// import CONFIG from '../config'

export interface LabelProps extends TextProps {}

const Label = React.forwardRef(function Label({
  className,
  ...props
}: LabelProps & React.LabelHTMLAttributes<HTMLLabelElement>, ref: any) {
  // const styles = CONFIG.form || {}
  return (
    <Text
      className={ className }
      as="label"
      { ...props }
      ref={ ref }
    />
  )
})

export default Label
