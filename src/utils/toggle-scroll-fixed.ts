import { Fn } from '../types'

function disableScroll() {
  const { style } = document.body
  style.top = `-${ window.pageYOffset }px`
  style.position = 'fixed'
  style.overflowY = 'scroll'
}

function enableScroll() {
  const { style } = document.body
  const y = parseFloat(style.top || '0') * -1
  style.position = ''
  style.top = ''
  window.scrollTo(0, y)
}

export default function toggleScroll(value: boolean): Fn {
  if (value) {
    enableScroll()
    return disableScroll
  }
  else {
    disableScroll()
    return enableScroll
  }
}
