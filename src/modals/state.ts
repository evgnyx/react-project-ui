import { Fn } from '../types'

export type UpdateModalsState = ((...args: any) => any) | null
export type ModalParams = { component: React.ReactNode } & ModalProps

export interface ModalProps {
  onClose?: Fn
}

export interface ModalsChildProps {
  modal: {
    index: number
    open: (component: React.ReactNode, config?: ModalProps) => void
    close: Fn
    replace: (component: React.ReactNode, config?: ModalProps, index?: number) => void
  }
}


const ModalsState = (() => new class ModalsStateClass {
  list!: ModalParams[]
  run!: UpdateModalsState

  constructor() {
    this.list = []
    this.run = null
  }

  setUpdate = (fn: UpdateModalsState) => {
    if (!this.run) this.run = fn
  }

  update = () => {
    this.run && this.run({})
  }

  openModal = (component: React.ReactNode, config?: ModalProps) => {
    this.list.push({ component, ...(config || {}) })
    this.update()
  }

  replaceModal = (component: React.ReactNode, config?: ModalProps, index: number = this.list.length - 1) => {
    this.list[index] = { component, ...(config || {}) }
    this.update()
  }

  closeModal = (index: number) => {
    if (!this.list[index]) return
    this.list.splice(index, 1)
    this.update()
  }
})()

export default ModalsState
