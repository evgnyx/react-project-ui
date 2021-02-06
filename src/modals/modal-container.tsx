import * as React from 'react'
import { cloneElement } from 'react'
import { getStyles } from '../config'
import { ModalContainerProps } from './'

function ModalContainer({
  index,
  onClose,
  openModal,
  closeModal,
  replaceModal,
  children,
  ...props
}: ModalContainerProps) {
  const styles = getStyles('modal')

  const handleClose = React.useCallback(() => {
    onClose && onClose()
    closeModal(index)
  }, [index])

  return (
    <div
      className={ styles.uiModalContainer }
    >
      <div
        className={ styles.uiModalOverlay }
        onClick={ handleClose }
      />
      { cloneElement(children, {
          ...props,
          modal: {
            open: openModal,
            close: handleClose,
            replace: replaceModal,
          }
        })
      }
    </div>
  )
}

export default React.memo(ModalContainer)
