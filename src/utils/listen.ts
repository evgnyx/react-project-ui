import { Fn } from '../types'

export default function listen(
  target: HTMLElement | (Window & typeof globalThis) | Document,
  events: string | string[],
  handler: Fn
): () => void {
  if (typeof events === 'string') target.addEventListener(events, handler)
  else events.forEach((e) => target.addEventListener(e, handler))

  return () => {
    if (typeof events === 'string') target.removeEventListener(events, handler)
    else events.forEach((e) => target.removeEventListener(e, handler))
  }
}
