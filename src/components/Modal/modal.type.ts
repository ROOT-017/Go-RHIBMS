export type ModalProps = {
  children: React.ReactNode;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  modal: boolean;
};
