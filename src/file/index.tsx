import * as React from 'react'
import join from '../utils/join'
import mergeRefs from '../utils/merge-refs'
import { getStyles } from '../config'

export interface FileProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value'> {
  value?: FileList | File[] | File | null
}

function resetInputFiles(input: HTMLInputElement) {
  input.files = null
  input.value = ''
}

const File = React.forwardRef(function File({
  className,
  value,
  children,
  ...props
}: FileProps, ref) {
  const styles = getStyles('file')

  const inputRef = React.useRef()

  React.useEffect(() => {
    if (!inputRef.current) return
    if (!value) resetInputFiles(inputRef.current!)
  }, [value])

  return (
    <div className={ join(styles.uiFile, className) }>
      <label className={ styles.uiFileLabel }>
        <input
          className={ styles.uiFileInput }
          { ...props }
          type="file"
          ref={ mergeRefs(ref, inputRef) }
        />
        <span className={ styles.uiFileText }>
          { children }
        </span>
      </label>
    </div>
  )
})

export default File
