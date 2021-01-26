export default function getElementOffset(element: HTMLElement) {
  if (!element) return

  if (!element || !element.getClientRects().length) return { x: 0, y: 0, width: 0, height: 0 }

  const rect = element.getBoundingClientRect()
  const win = element.ownerDocument.defaultView

  return {
    x: rect.left + win!.pageXOffset,
    y: rect.top + win!.pageYOffset,
    width: rect.width,
    height: rect.height,
  }
}
