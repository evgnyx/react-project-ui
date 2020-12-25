import { useMemo } from 'react'
import { Config } from './types'

const CONFIG = {} as Config
Object.defineProperty(CONFIG, 'get', {
  value(name: string) {
    return useMemo(() => CONFIG[name] || {}, [])
  }
})

export function configure(data: Config) {
  for (const k in data) {
    CONFIG[k] = data[k]
  }
}

export default CONFIG
