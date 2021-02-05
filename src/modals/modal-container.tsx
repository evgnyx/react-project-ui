import * as React from 'react'
import join from '../utils/join'
import { getStyles } from '../config'
import ModalsState, { ModalProps, ModalsChildProps } from './state'

interface ModalContainerProps extends React.PropsWithChildren<ModalProps> {
  index: number
}

function ModalContainer({
  index,
  onClose,
  children
}: ModalContainerProps) {
  const styles = getStyles('modal')

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
      { React.cloneElement<ModalsChildProps>(React.Children.only(children) as any, {
          modal: {
            index,
            open: ModalsState.openModal,
            close: handleClose,
            replace: ModalsState.replaceModal,
          }
        })
      }
    </div>
  )
}

export default ModalContainer
