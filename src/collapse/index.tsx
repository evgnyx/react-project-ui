import * as React from 'react'
import join from '../utils/join'
import listen from '../utils/listen'
import CONFIG from '../config'
import { Fn } from '../types'


const Settings = {
  class: 'ui-collapse',
  isOpen: 'open',
  isClosed: 'closed',
  isOpening: 'opening',
  isClosing: 'closing',
}

interface CollapseProps extends React.PropsWithChildren<{
  className?: string
  isOpen: boolean
  onBeforeOpen?: Fn
  onAfterOpen?: Fn
  onBeforeClose?: Fn
  onAfterClose?: Fn
}> {}

interface StateParams extends React.CSSProperties {
  dataCollapse: string
  ready: boolean
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

  const [state, setState] = React.useState<StateParams>({
    height: isOpen ? 'auto' : 0,
    dataCollapse: isOpen ? Settings.isOpen : Settings.isClosed,
    ready: false,
  })

  const elementRef = React.useRef<HTMLDivElement>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)

  React.useImperativeHandle(ref, () => elementRef.current)

  const handleTransition = React.useCallback(({ propertyName, type }) => {
    if (propertyName !== 'height') return
    if (type === 'transitionend') {
      const _isOpen = elementRef.current!.clientHeight > 0
      setState({
        height: _isOpen ? 'auto' : elementRef.current!.clientHeight,
        dataCollapse: _isOpen ? Settings.isOpen : Settings.isClosed,
        ready: true,
      })
      if (_isOpen && onAfterOpen) onAfterOpen()
      if (!_isOpen && onAfterClose) onAfterClose()
    }
  }, [])

  React.useEffect(() => {
    if (!elementRef.current || !contentRef.current) return

    if (!state.ready) {
      return setState((s) => ({ ...s, ready: true }))
    }

    ;(async () => {
      if (isOpen && onBeforeOpen) await onBeforeOpen()
      if (!isOpen && onBeforeClose) await onBeforeClose()

      setState({
        height: contentRef.current!.clientHeight,
        dataCollapse: isOpen ? Settings.isOpening : Settings.isClosing,
        ready: true,
      })

      if (!isOpen) setTimeout(() => setState((s) => ({ ...s, height: 0 })), 10)
    })()

    return listen(elementRef.current, ['transitionstart', 'transitionend'], handleTransition)
  }, [isOpen])

  return (
    <div
      className={
        join(
          styles.uiCollapse || Settings.class,
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
