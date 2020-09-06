export default function join(...arg: any[]): string {
  let str = ''
  for (let i = 0; i < arg.length; i++) {
    if (!arg[i]) continue
    if (str) str += ' '
    str += arg[i]
  }
  return str
}
