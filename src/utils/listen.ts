export default function listen(target: any, events: string[], handler: Fn): () => void {
  events.forEach((e) => target.addEventListener(e, handler))
  return () => {
    events.forEach((e) => target.removeEventListener(e, handler))
  }
}
