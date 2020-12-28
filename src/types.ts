export type Fn = (...args: any[]) => any
export type ClassList = { [className: string]: string }
export interface Config { [name: string]: ClassList }
