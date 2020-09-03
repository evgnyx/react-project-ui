import * as React from 'react'


const DIRECTION = {
  top: 'top',
  up: 'up',
  down: 'down',
}

function getScrollOffset(root: HTMLElement): number {
  if (!root) return 0
  return root === document.documentElement
    ? window.pageYOffset
    : root.scrollTop
}

function getScrollState(root: HTMLElement, prevOffset: number) {
  const offset = getScrollOffset(root)
  return {
    offset,
    status: getDirection(offset, prevOffset),
  }
}

function getDirection(offset: number, prev: number): string {
  return offset === 0
      ? DIRECTION.top
      : prev > offset
        ? DIRECTION.up
        : DIRECTION.down
}

function getElementOffset(element: HTMLElement, root: HTMLElement): number {
  return element.offsetTop - root.offsetTop - root.scrollTop
}

interface StateParams extends React.CSSProperties {
  dataSticky: string,
}

function getElementStyles(
  elementOffset: number,
  root: HTMLElement,
  scrollState: string
): StateParams {
  if (elementOffset < 0) {
    const { left, width } = root.getBoundingClientRect()
    const scrollWidth = root.offsetWidth - root.clientWidth
    return {
      position: 'fixed',
      top: root.offsetTop,
      left,
      width: width - scrollWidth,
      dataSticky: scrollState,
    }
  }
  else {
    return {
      dataSticky: scrollState,
    }
  }
}


interface StickyProps {
  className?: string,
  root?: React.RefObject<HTMLElement>,
  onScroll?: Fn,
  onScrollStateChange?: Fn,
}

function Sticky({
  className,
  root = React.useRef(document.documentElement),
  onScroll,
  onScrollStateChange,
  children
}: React.PropsWithChildren<StickyProps>) {
  const [state, setState] = React.useState<StateParams>({} as StateParams)

  const ready = React.useRef(false)
  const wrapperRef = React.useRef<HTMLDivElement>(null)
  const elementRef = React.useRef<HTMLDivElement>(null)

  const prev = React.useRef<any>({})

  const handleScroll = React.useCallback(function _handleScroll() {
    if (!ready.current) {
      ready.current = true
      return
    }

    if (!elementRef.current || !wrapperRef.current) return

    const scrollState = getScrollState(root.current!, prev.current.offset)
    const elementOffset = getElementOffset(wrapperRef.current, root.current!)

    if (onScroll || onScrollStateChange) {
      const data = {
        status: scrollState.status,
        scrollOffset: scrollState.offset,
        elementOffset,
      }
      onScroll && onScroll(data)
      if (scrollState.status !== prev.current.status) {
        onScrollStateChange && onScrollStateChange(data)
      }
    }

    if (elementOffset < 0) {
      if (elementRef.current.style.position !== 'fixed' || scrollState.status !== prev.current.status) {
        const styles = getElementStyles(elementOffset, root.current!, scrollState.status)
        setState(styles)
      }
    }
    else {
      if (elementRef.current.style.position === 'fixed') {
        const styles = getElementStyles(elementOffset, root.current!, scrollState.status)
        setState(styles)
      }
    }

    prev.current.offset = scrollState.offset
    prev.current.status = scrollState.status
  }, [])

  const handleResize = React.useCallback(function _handleResize() {
    if (!root.current || !elementRef.current) return
    const elementOffset = getElementOffset(wrapperRef.current!, root.current)
    const scrollState = getScrollState(root.current, prev.current.offset)
    const styles = getElementStyles(elementOffset, root.current, scrollState.status)
    if (styles.width !== elementRef.current.clientWidth) {
      setState(styles)
    }
  }, [])

  React.useEffect(() => {
    if (!root.current) return

    const elementOffset = getElementOffset(wrapperRef.current!, root.current)
    const scrollState = getScrollState(root.current, prev.current.offset)
    const styles = getElementStyles(elementOffset, root.current, scrollState.status)
    setState(styles)

    const target = root.current === document.documentElement ? document : root.current
    target.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)

    return () => {
      target.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div
      style={{ height: elementRef.current?.offsetHeight }}
      ref={ wrapperRef }
    >
      <div
        className={ className }
        ref={ elementRef }
        style={{
          position: state.position,
          top: state.top,
          left: state.left,
          width: state.width,
          transform: 'translateZ(0)',
        }}
        data-sticky={ state.dataSticky }
      >
        { children }
      </div>
    </div>
  )
}

export default Sticky
