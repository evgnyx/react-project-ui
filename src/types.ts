export type Fn = (value?: any, ...args: any[]) => any
export type ClassList = { [className: string]: string }
export type ColorType = string | false | null
export interface Config { [name: string]: ClassList }
