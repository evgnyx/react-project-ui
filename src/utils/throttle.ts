export default function throttle(fn: Fn, delay = 100, debounce = false) {
  let timer: any
  let init = debounce
  return (e: any) => {
    if (!init) {
      fn(e)
      init = true
    }

    if (debounce) clearTimeout(timer)
    else if (timer) return

    timer = setTimeout(() => {
      fn(e)
      timer = null
    }, delay)
  }
}
