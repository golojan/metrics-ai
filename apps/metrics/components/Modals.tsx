import React from "react";
import { Modal } from "react-bootstrap";
type ModalProps = {
  children: React.ReactElement;
  show?: boolean;
};
const Modals = ({ children, show = false }: ModalProps) => {
  return <Modal show={show}>{children}</Modal>;
};

export default Modals;
