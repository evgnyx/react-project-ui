import * as React from 'react'
import { join } from '../tools'
import listen from '../utils/listen'
import CONFIG from '../config'


const DEFAULTS = {
  class: 'ui-collapse',
  isOpen: 'open',
  isClosed: 'closed',
  isOpening: 'opening',
  isClosing: 'closing',
}

type Callback = (...args: any[]) => any

interface CollapseProps extends React.PropsWithChildren<{
  className?: string,
  isOpen: boolean,
  onBeforeOpen?: Callback
  onAfterOpen?: Callback
  onBeforeClose?: Callback
  onAfterClose?: Callback
}> {}

interface StateParams extends React.CSSProperties {
  dataCollapse: string,
}

function Collapse({
  className,
  isOpen,
  onBeforeOpen,
  onAfterOpen,
  onBeforeClose,
  onAfterClose,
  children
}: CollapseProps, ref: any) {
  const styles = CONFIG.collapse || {}

  const [state, setState] = React.useState<StateParams>({} as StateParams)

  const elementRef = React.useRef<HTMLDivElement>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)

  React.useImperativeHandle(ref, () => elementRef.current)

  const handleTransition = React.useCallback(({ propertyName, type }) => {
    if (propertyName !== 'height') return
    if (type === 'transitionend') {
      const _isOpen = elementRef.current!.clientHeight === contentRef.current!.clientHeight
      setState({
        height: _isOpen ? 'auto' : elementRef.current!.clientHeight,
        dataCollapse: _isOpen ? DEFAULTS.isOpen : DEFAULTS.isClosed,
      })
      if (_isOpen && onAfterOpen) onAfterOpen()
      if (!_isOpen && onAfterClose) onAfterClose()
    }
  }, [])

  React.useLayoutEffect(() => {
    if (!elementRef.current || !contentRef.current) return

    if (!state.dataCollapse) {
      setState({
        height: isOpen ? 'auto' : 0,
        dataCollapse: isOpen ? DEFAULTS.isOpen : DEFAULTS.isClosed,
      })
      return
    }

    ;(async () => {
      if (isOpen && onBeforeOpen) await onBeforeOpen()
      if (!isOpen && onBeforeClose) await onBeforeClose()

      setState({
        height: contentRef.current!.clientHeight,
        dataCollapse: isOpen ? DEFAULTS.isOpening : DEFAULTS.isClosing,
      })
      if (!isOpen) setTimeout(() => setState((s) => ({ ...s, height: 0 })), 0)
    })()

    return listen(elementRef.current, ['transitionstart', 'transitionend'], handleTransition)
  }, [isOpen])

  return (
    <div
      className={
        join(
          styles.uiCollapse || DEFAULTS.class,
          className
        )
      }
      data-collapse={ state.dataCollapse }
      ref={ elementRef }
      style={{ height: state.height }}
    >
      <div
        className={ join(styles.uiCollapseContent) }
        ref={ contentRef }
      >
        { children }
      </div>
    </div>
  )
}

export default React.forwardRef(Collapse)
