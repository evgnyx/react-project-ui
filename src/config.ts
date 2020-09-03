const CONFIG: Config = {}

export function configure(data: Config) {
  for (const k in data) {
    CONFIG[k] = data[k]
  }
}

export default CONFIG
