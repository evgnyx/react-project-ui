import * as React from 'react'
import listen from '../utils/listen'

// const TRANSITION_START = ['transitionstart', 'webkitTransitionStart', 'oTransitionStart', 'MSTransitionStart']
// const TRANSITION_END = ['transitionend', 'webkitTransitionEnd', 'oTransitionEnd', 'MSTransitionEnd']
const TRANSITION_START = ['transitionstart']
const TRANSITION_END = ['transitionend']

const DEFAULTS = {
  visible: 'visible',
  hidden: 'hidden',
  fadeIn: 'fade-in',
  fadeOut: 'fade-out',
}

function getState(target: HTMLElement, type: string): any {
  const opacity = parseFloat(target.style.opacity)
  if (type === 'transitionstart') {
    return {
      dataFade: opacity ? DEFAULTS.fadeIn : DEFAULTS.fadeOut
    }
  }
  if (type === 'transitionend') {
    return {
      dataFade: opacity ? DEFAULTS.visible : DEFAULTS.hidden,
      visibility: opacity ? undefined : 'hidden',
    }
  }
}

interface StateParams extends React.CSSProperties {
  dataFade: string,
}

interface FadeProps {
  className?: string,
  visible: boolean,
}

function Fade({
  className,
  visible,
  children
}: React.PropsWithChildren<FadeProps>) {
  const [state, setState] = React.useState<StateParams>({
    dataFade: visible ? DEFAULTS.visible : DEFAULTS.hidden
  })

  const elementRef = React.useRef<HTMLDivElement>(null)

  const handleTransition = React.useCallback(({ propertyName, target, type }) => {
    if (propertyName !== 'opacity') return
    setState(getState(target, type))
  }, [])

  React.useEffect(() => {
    if (!elementRef.current) return

    const clearStartEvent = listen(elementRef.current, TRANSITION_START, handleTransition)
    const clearEndEvent = listen(elementRef.current, TRANSITION_END, handleTransition)

    return () => {
      clearStartEvent()
      clearEndEvent()
    }
  }, [])

  return (
    <div
      className={ className }
      ref={ elementRef }
      data-fade={ state.dataFade }
      style={{
        opacity: visible ? 1 : 0,
        visibility: state.visibility,
        transition: 'opacity 200ms linear',
      }}
    >
      { children }
    </div>
  )
}

export default Fade
