import { useMemo } from 'react'
import { Config } from './types'

const CONFIG: Config = {}

export function getStyles(name: string) {
  return useMemo(() => CONFIG[name] || {}, [])
}

export function configure(data: Config) {
  for (const k in data) {
    CONFIG[k] = data[k]
  }
}

export default CONFIG
