import * as React from 'react'
import join from '../utils/join'
import { getStyles } from '../config'
import ModalsState, { ModalProps } from './state'

interface ModalContainerProps extends React.PropsWithChildren<ModalProps> {
  index: number
}

function ModalContainer({
  index,
  onClose,
  children
}: ModalContainerProps) {
  const styles = getStyles('text')

  const handleClose = React.useCallback(() => {
    onClose && onClose()
    ModalsState.closeModal(index)
  }, [index])

  return (
    <div className={ join(styles.uiModalContainer) }>
      <div
        className={ styles.uiModalOverlay }
        onClick={ handleClose }
      />
      { React.cloneElement(React.Children.only(children) as any, {
          close: handleClose
        })
      }
    </div>
  )
}

export default ModalContainer
