export type UpdateModalsState = ((...args: any) => any) | null
export type ModalParams = { component: React.ReactNode } & ModalProps

export interface ModalProps {
  onClose?: () => void
}

const ModalsState = (() => new class ModalsStateClass {
  list!: ModalParams[]
  run!: UpdateModalsState

  constructor() {
    this.list = []
    this.run = null
  }

  setUpdate(fn: UpdateModalsState) {
    if (!this.run) this.run = fn
  }

  openModal(component: React.ReactNode, config?: ModalProps) {
    this.list.push({ component, ...(config || {}) })
    this.run && this.run()
  }

  closeModal(index: number) {
    if (!this.list[index]) return
    this.list.splice(index, 1)
    this.run && this.run()
  }
})()

export default ModalsState
