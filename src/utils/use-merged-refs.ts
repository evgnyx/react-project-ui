import { useEffect, useRef } from 'react'

export default function useMergedRefs<T>(...refs: React.Ref<any>[]) {
  const mergedRef = useRef<any>()
  useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) return
      if (typeof ref === 'function') ref(mergedRef.current)
      else (ref.current as any) = mergedRef.current
    })
  }, [refs])
  return mergedRef as React.MutableRefObject<T>
}
