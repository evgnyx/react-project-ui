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
    closeModal(index)
  }, [index])

  const modal = React.useMemo(() => {
    return {
      open: openModal,
      close: handleClose,
      replace: replaceModal,
    }
  }, [handleClose])

  return (
    <div
      className={ styles.uiModalContainer }
    >
      <div
        className={ styles.uiModalOverlay }
        onClick={ handleClose }
      />
      { cloneElement(children, { ...props, modal }) }
    </div>
  )
}

export default React.memo(ModalContainer)
