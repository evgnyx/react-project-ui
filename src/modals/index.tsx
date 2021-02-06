import Modals, { modal } from './modals'

export interface ModalChildrenProps {
  modal: {
    open: ModalStateInstance['openModal']
    close: () => void
    replace: ModalStateInstance['replaceModal']
  }
}

type ModalProps = {
  onClose?: () => void
} & { [key: string]: any }

export interface ModalsListItem {
  component: React.ComponentType<any>
  key: string
  props: ModalProps
}

export interface ModalStateInstance {
  isOpen: boolean
  list: ModalsListItem[]
  run(): void
  init(fn: React.Dispatch<React.SetStateAction<any>>): void
  update(): void
  openModal(component: ModalsListItem['component'], config?: ModalProps): void
  closeModal(index: number): void
  replaceModal(component: ModalsListItem['component'], config?: ModalProps, index?: number): void
}

export interface ModalContainerProps extends React.PropsWithChildren<any> {
  index: number
  openModal: ModalStateInstance['openModal']
  closeModal: ModalStateInstance['closeModal']
  replaceModal: ModalStateInstance['replaceModal']
}

export { modal }

export default Modals
