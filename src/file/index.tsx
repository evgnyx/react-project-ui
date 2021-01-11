import * as React from 'react'
import useMergedRefs from '../utils/use-merged-refs'
import join from '../utils/join'
import { getStyles } from '../config'

export interface FileProps extends React.InputHTMLAttributes<HTMLInputElement> {}

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

  const input = React.useRef()
  const mergedRef = useMergedRefs<HTMLInputElement | null>(ref, input)

  React.useEffect(() => {
    if (!mergedRef.current) return
    if (!value) resetInputFiles(mergedRef.current)
  }, [value])

  return (
    <div className={ join(styles.uiFile, className) }>
      <label className={ styles.uiFileLabel }>
        <input
          className={ styles.uiFileInput }
          { ...props }
          type="file"
          ref={ mergedRef }
        />
        <span className={ styles.uiFileText }>
          { children }
        </span>
      </label>
    </div>
  )
})

export default File
