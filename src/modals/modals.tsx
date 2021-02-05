import * as React from 'react'
import { createPortal } from 'react-dom'
import ModalsState from './state'
import ModalContainer from './modal-container'
import { Fn } from '../types'

interface ModalsProps {
  onOpen?: Fn
  onClose?: Fn
}

function Modals({ onOpen, onClose }: ModalsProps): any | null {
  const state = React.useState({})
  const ready = React.useRef(false)

  React.useEffect(() => {
    ModalsState.setUpdate(state[1])
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
          key={ i }
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

export default Modals
