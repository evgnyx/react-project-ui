import * as React from 'react'
import { createPortal } from 'react-dom'
import { ModalStateInstance, ModalsListItem, ModalContainerProps } from './'
import ModalContainer from './modal-container'


function genId(index: number) {
  return `${ index }.${ +new Date() }`
}

function createModal(
  component: ModalsListItem['component'],
  config: ModalsListItem['props'],
  index: number
): ModalsListItem {
  return {
    component,
    key: genId(index),
    props: config || {}
  }
}

const [ModalState, modal] = ((): [
  ModalStateInstance, {
  open: ModalStateInstance['openModal']
  replace: ModalStateInstance['replaceModal']
}] => {
  const ModalState = new class {
    isOpen = false
    isActiveWindow = true
    list = [] as ModalStateInstance['list']
    run!: any
    focusTimer!: any
    init = (fn: any) => {
      this.run = fn
    }
    update = () => {
      this.run && this.run({})
    }
    openModal = (component: ModalsListItem['component'], config?: ModalsListItem['props']) => {
      this.list.push(createModal(component, config!, this.list.length))
      this.update()
    }
    closeModal = (index: number) => {
      if (!this.list[index]) return
      const modal = this.list.splice(index, 1)[0]
      modal.props.onClose && modal.props.onClose()
      this.update()
    }
    replaceModal = (component: ModalsListItem['component'], config?: ModalsListItem['props'], index: number = this.list.length - 1) => {
      this.list[index] = createModal(component, config!, index)
      this.update()
    }
  }

  if (typeof window !== 'undefined') {
    window.onfocus = () => {
      clearTimeout(ModalState.focusTimer)
      ModalState.focusTimer = setTimeout(() => {
        ModalState.isActiveWindow = true
      }, 100)
    }
    window.onblur = () => {
      clearTimeout(ModalState.focusTimer)
      ModalState.focusTimer = setTimeout(() => {
        ModalState.isActiveWindow = false
      }, 100)
    }
  }

  return [
    ModalState,
    {
      open: ModalState.openModal,
      replace: ModalState.replaceModal
    }
  ]
})()


interface ModalsProps {
  onInit?: () => any
  onOpen?: () => any
  onClose?: () => any
  Container?: React.ComponentType<ModalContainerProps>
}

function Modals({
  onOpen,
  onClose,
  Container = ModalContainer
}: ModalsProps): any {
  const state = React.useState<any>({})

  React.useEffect(() => {
    ModalState.init(state[1])
  }, [])

  const closeModal = React.useCallback((index) => {
    if (ModalState.isActiveWindow) {
      ModalState.closeModal(index)
    }
  }, [])

  if (ModalState.list.length) {
    if (!ModalState.isOpen) {
      onOpen && onOpen()
      ModalState.isOpen = true
    }
    return ModalState.list.map((modal, i) => createPortal(
      <Container
        { ...modal.props }
        index={ i }
        openModal={ ModalState.openModal }
        closeModal={ closeModal }
        replaceModal={ ModalState.replaceModal }
        key={ modal.key }
      >
        <modal.component />
      </Container>
      , document.body
    ))
  }

  if (ModalState.isOpen) {
    onClose && onClose()
    ModalState.isOpen = false
  }

  return null
}

export { modal }

export default React.memo(Modals)
