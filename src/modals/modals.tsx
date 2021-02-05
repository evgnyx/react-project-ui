import * as React from 'react'
import { createPortal } from 'react-dom'
import { ModalsContainerProps, ModalProps, ModalParams, UpdateModalsState, ModalsStateInterface } from './'
import ModalContainer from './modal-container'

type ModalComponent = React.ReactNode

function genId(index: number) {
  return `${ index }.${ +new Date() }`
}

function createModal(component: ModalComponent, config: ModalProps, index: number): ModalParams {
  return { component, key: genId(index), ...(config || {}) }
}

const ModalsState = (() => new class ModalsStateClass implements ModalsStateInterface {
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

  openModal = (component: ModalComponent, config?: ModalProps) => {
    this.list.push(createModal(component, config!, this.list.length))
    this.update()
  }

  replaceModal = (component: ModalComponent, config?: ModalProps, index: number = this.list.length - 1) => {
    this.list[index] = createModal(component, config!, index)
    this.update()
  }

  closeModal = (index: number) => {
    if (!this.list[index]) return
    this.list.splice(index, 1)
    this.update()
  }
})()


function Modals({ onInit, onOpen, onClose }: ModalsContainerProps): any | null {
  const state = React.useState({})
  const ready = React.useRef(false)

  React.useEffect(() => {
    ModalsState.setUpdate(state[1])
    onInit && onInit({ open: ModalsState.openModal })
  }, [])

  if (ModalsState.list.length) {
    if (!ready.current) {
      onOpen && onOpen()
      ready.current = true
    }
    
    return ModalsState.list.map((modal, i) => {
      return createPortal(
        <ModalContainer
          index={ i }
          onClose={ modal.onClose }
          openModal={ ModalsState.openModal }
          closeModal={ ModalsState.closeModal }
          replaceModal={ ModalsState.replaceModal }
          key={ modal.key }
        >
          { modal.component }
        </ModalContainer>
        , document.body
      )
    })
  }

  if (ready.current) {
    onClose && onClose()
    ready.current = false
  }

  return null
}

export function useModal() {
  return {
    open: (Modal: ModalParams['component'], config?: ModalProps) => {
      ModalsState.openModal(Modal, config)
    }
  }
}

export default Modals
