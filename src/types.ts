export type Fn = (...args: any[]) => any
export type ClassList = { [className: string]: string }
export interface Config {
  get: (name: string) => ClassList
  [name: string]: ClassList | any
}
