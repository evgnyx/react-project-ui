import { Fn } from '../types'

const backup = {} as any

function disableScroll() {
  const { style } = document.body
  backup.top = style.top
  backup.width = style.width
  backup.position = style.position
  backup.overflowY = style.overflowY

  style.top = `-${ window.pageYOffset }px`
  style.width = '100%'
  style.position = 'fixed'
  style.overflowY = 'scroll'
}

function enableScroll() {
  const { style } = document.body
  const y = parseFloat(style.top || '0') * -1
  style.top = backup.top
  style.width = backup.width
  style.position = backup.position
  style.overflowY = backup.overflowY
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
