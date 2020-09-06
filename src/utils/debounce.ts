import { Fn } from '../types'
import throttle from './throttle'

export default function debounce(fn: Fn, delay = 1000) {
  return throttle(fn, delay, true)
}
