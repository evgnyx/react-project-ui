import * as React from 'react'
import join from '../utils/join'
import isInside from '../utils/is-inside'
import listen from '../utils/listen'
import useMergedRefs from '../utils/use-merged-refs'
import { getStyles } from '../config'
import { Fn } from '../types'

function isFunction(value: any): value is Function {
  return typeof value === 'function'
}

export interface ChildProps extends React.DOMAttributes<HTMLDivElement> {
  isOpen: boolean
  open: Fn
  close: Fn
}

function handleChild(value: any, props?: ChildProps) {
  return isFunction(value)
    ? value(props)
    : React.cloneElement(value, props)
}

type ChildType = React.ReactElement | ((props: any) => React.ReactElement)

interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  showOnHover?: boolean
  children: [ChildType, ChildType]
}

const Dropdown = React.forwardRef(function Dropdown({
  className,
  showOnHover,
  children,
  ...props
}: DropdownProps, ref: any) {
  const styles = getStyles('dropdown')

  const [open, setOpen] = React.useState(false)

  const containerRef = React.useRef(null)
  const mergedRef = useMergedRefs<HTMLDivElement>(ref, containerRef)
  const onOpen = () => setOpen(true)
  const onClose = () => setOpen(false)

  const handleClickOutside = React.useCallback((e) => {
    if (!mergedRef.current) return
    if (!isInside(e.target, mergedRef.current)) {
      onClose()
    }
  }, [])

  const handler = React.useRef<Fn>()
  const [trigger, dropdown] = React.useMemo(() => {
    const trigger = handleChild(children[0], {
      isOpen: open,
      open: onOpen,
      close: onClose,
      onClick: () => setOpen((x) => !x),
    })

    let dropdown = null
    if (open) {
      dropdown = handleChild(children[1], {
        isOpen: open,
        open: onOpen,
        close: onClose,
      })
      handler.current = listen(document, 'click', handleClickOutside)
    }
    else {
      handler.current && handler.current()
    }

    return [trigger, dropdown]
  }, [open])

  React.useEffect(() => handler.current && handler.current(), [])

  return (
    <div
      className={
        join(
          styles.uiDropdown,
          open && styles.open,
          className
        )
      }
      onMouseEnter={ showOnHover ? onOpen : props.onMouseEnter }
      onMouseLeave={ showOnHover ? onClose : props.onMouseLeave }
      { ...props }
      ref={ mergedRef }
    >
      { trigger }
      { dropdown }
    </div>
  )
})

export default Dropdown
