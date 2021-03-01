import * as React from 'react'
import join from '../utils/join'
import { getStyles } from '../config'

type ValueType = string | number | boolean | null
type OptionItem = {
  text: string
  value: ValueType
}

interface ToggleProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: ValueType
  name?: string
  onChange?: (option?: OptionItem, name?: string) => any
  options: OptionItem[]
}

function Toggle({
  className,
  value,
  name,
  onChange,
  options,
  children,
}: ToggleProps): React.ReactElement {
  const styles = getStyles('toggle')

  const [selected, next] = React.useMemo(() => {
    let next: OptionItem | undefined
    const selected = options.find((x, i): any => {
      if (x.value === value) {
        next = i + 1 >= options.length ? options[0] : options[i + 1]
        return true
      }
    })
    return [selected, next]
  }, [value, options])

  return (
    <div
      className={ join(styles.uiToggle, className) }
      onClick={ () => onChange && onChange(next, name) }
    >
      { children }
      { (selected && selected.text) &&
        <span className={ styles.uiToggleText }>
          { selected.text }
        </span>
      }
    </div>
  )
}

export default Toggle
