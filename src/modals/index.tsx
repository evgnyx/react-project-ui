import * as React from 'react'
import { createPortal } from 'react-dom'
import ModalsState from './state'
import ModalContainer from './modal-container'

function Modals(): any | null {
  const state = React.useState({})

  React.useEffect(() => {
    ModalsState.setUpdate(state[1])
  }, [])

  if (ModalsState.list.length) {
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
  return null
}

export default Modals
