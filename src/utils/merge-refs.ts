import { Ref, RefCallback, MutableRefObject } from 'react'

export default function mergeRefs<T extends any>(...refs: Ref<any>[]): RefCallback<T> {
  return (el: T) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') ref(el)
      else if (ref && typeof ref === 'object') {
        (ref as MutableRefObject<T>).current = el
      }
    })
  }
}
