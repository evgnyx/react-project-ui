import { Fn } from '../types'

function enableScroll() {
  document.documentElement.style.height = ''
  document.documentElement.style.overflow = ''
  document.body.style.overflowY = ''
}

function disableScroll() {
  document.documentElement.style.height = '100vh'
  document.documentElement.style.overflow = 'hidden'
  document.body.style.overflowY = 'scroll'
}

export default function toggleScroll(value: boolean): Fn {
  console.log(value)
  if (value) {
    enableScroll()
    return disableScroll
  }
  else {
    disableScroll()
    return enableScroll
  }
}
