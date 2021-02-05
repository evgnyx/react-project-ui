import * as React from 'react'
import join from '../utils/join'
import { getStyles } from '../config'
import { ModalProps, ModalsChildProps, ModalsStateInterface } from './'

interface ModalContainerProps extends React.PropsWithChildren<ModalProps> {
  index: number
  openModal: ModalsStateInterface['openModal']
  closeModal: ModalsStateInterface['closeModal']
  replaceModal: ModalsStateInterface['replaceModal']
}

function ModalContainer({
  index,
  onClose,
  openModal,
  replaceModal,
  closeModal,
  children
}: ModalContainerProps) {
  const styles = getStyles('modal')

  const handleClose = React.useCallback(() => {
    onClose && onClose()
    closeModal(index)
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
            open: openModal,
            close: handleClose,
            replace: replaceModal,
          }
        })
      }
    </div>
  )
}

export default ModalContainer
