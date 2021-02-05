import Modals, { useModal } from './modals'
import { Fn } from '../types'

export type UpdateModalsState = ((...args: any) => any) | null

export interface ModalsStateInterface {
  openModal: (component: React.ReactNode, config?: ModalProps) => void
  closeModal: (index: number) => void
  replaceModal: (component: React.ReactNode, config?: ModalProps, index?: number) => void
}

export interface ModalProps {
  onClose?: Fn
}
export type ModalParams = { component: React.ReactNode, key: string } & ModalProps

interface ModalMethods {
  open: (component: React.ReactNode, config?: ModalProps) => void
  close: Fn
  replace: (component: React.ReactNode, config?: ModalProps, index?: number) => void
}

export interface ModalsContainerProps {
  onInit?: (modal: Pick<ModalMethods, 'open'>) => void
  onOpen?: Fn
  onClose?: Fn
}

export interface ModalsChildProps {
  modal: {
    index: number
  } & ModalMethods
}

export { useModal }
export default Modals
