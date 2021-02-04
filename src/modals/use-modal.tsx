import ModalsState, { ModalParams, ModalProps } from './state'

function useModal() {
  return {
    open(Modal: ModalParams['component'], config?: ModalProps) {
      ModalsState.openModal(Modal, config)
    }
  }
}

export default useModal
