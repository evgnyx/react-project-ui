import * as React from 'react'
import { join } from '../tools'
import { getStyles } from '../config'


interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  item?: boolean,
  fluid?: boolean,
  spaced?: boolean,
  ai?: 'start' | 'end' | 'center',
  jc?: 'start' | 'end' | 'center',
  view?: string,
}

const gridKey = 'ui-grid'

function Grid({
  className,
  item,
  fluid,
  spaced,
  ai,
  jc,
  view,
  ...props
}: GridProps) {
  const classlist = React.useMemo(() => {
    const [styles, theme] = getStyles('grid')
    ai = ai && `ai-${ ai }` as any
    jc = jc && `jc-${ jc }` as any
    return join(
      styles![gridKey] || gridKey,
      styles![view!] || theme![view!] || view,
      item && (styles!.item || 'item'),
      fluid && (styles!.fluid || 'fluid'),
      spaced && (styles!.spaced || 'spaced'),
      ai && (styles![ai] || ai),
      jc && (styles![jc] || jc),
      className
    )
  }, [className, item, fluid, spaced, ai, jc, view])

  return (
    <div
      className={ classlist }
      { ...props }
    />
  )
}

export default React.memo(Grid)
