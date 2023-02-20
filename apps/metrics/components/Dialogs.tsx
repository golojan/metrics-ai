import React from "react";
import { Modal } from "react-bootstrap";
type ModalProps = {
  children: React.ReactElement;
  show?: boolean;
};
const Dialogs = ({ children }: ModalProps) => {
  return <Modal.Dialog>{children}</Modal.Dialog>;
};

export default Dialogs;
