import * as React from 'react'
import join from '../utils/join'
import { getStyles } from '../config'
import { ColorType } from '../types'

interface OptParams {
  lh: number
  h: number
  r: number
  auto: boolean
}

function setRows(
  element: HTMLTextAreaElement,
  opt: OptParams,
  maxRows?: number
) {
  element.rows = opt.r
  const rows = Math.ceil(((element.scrollHeight - opt.h)/opt.lh)) + opt.r
  if (maxRows && rows > maxRows) {
    element.style.overflow = 'auto'
    element.rows = maxRows
  }
  else {
    element.style.overflow = 'hidden'
    element.rows = rows
  }
}

function getCssValue(element: HTMLElement, propName: string) {
  return window.getComputedStyle(element, null).getPropertyValue(propName)
}


function defineOpt(element: HTMLTextAreaElement, opt: OptParams) {
  opt.lh = Math.floor(+getCssValue(element, 'line-height').replace(/[^\d\.]*/g, ''))
  const v = element.value
  element.value = ''
  opt.h = element.scrollHeight
  element.value = v
}

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'color' | 'size'> {
  variant?: string
  color?: ColorType
  size?: string
  maxRows?: number
  autoHeight?: boolean
  resize?: boolean | 'horizontal' | 'vertical'
}

const Textarea = React.forwardRef(function Textarea({
  className,
  variant,
  color,
  size,
  children,
  onChange,
  rows,
  maxRows,
  autoHeight,
  resize,
  style,
  ...props
}: TextareaProps, ref) {
  const styles = getStyles('textarea')
  const container = React.useRef<HTMLDivElement>(null)
  const opt = React.useRef({ r: rows || 3, auto: autoHeight } as OptParams)

  const handleChange = React.useCallback((e) => {
    opt.current.auto && setRows(e.target, opt.current, maxRows)
    onChange && onChange(e)
  }, [])

  const handleContainerClick = React.useCallback(() => {
    if (!autoHeight || !container.current) return
    container.current!.getElementsByTagName('textarea')[0]?.focus()
  }, [autoHeight])

  React.useLayoutEffect(() => {
    if (!container.current || !opt.current.auto) return
    const field = container.current.getElementsByTagName('textarea')[0]
    defineOpt(field, opt.current)
  }, [])

  return (
    <div
      className={
        join(
          styles.uiTextarea,
          props.value && styles.isComplete,
          styles[variant as any],
          styles[color as any],
          styles[size!],
          resize && styles[resize as any] || styles.resize,
          className
        )
      }
      onClick={ handleContainerClick }
      style={ style }
      ref={ container }
    >
      <textarea
        className={ styles.uiTextareaField }
        onChange={ handleChange }
        rows={ opt.current.r }
        { ...props }
        ref={ ref as any }
      />
      { children }
    </div>
  )
})

export default Textarea
