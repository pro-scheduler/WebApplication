import React, { FunctionComponent } from 'react';
import Modal from 'react-bootstrap/Modal';
import styles from './Popup.module.css';

export type PopupProps = {
  show: boolean;
  title: string;
  onClose: Function;
};

const Popup: FunctionComponent<PopupProps> = ({ show, title, onClose, children }) => {
  return (
    <Modal
      show={show}
      onHide={onClose}
      animation={false}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className={styles.popupTitle}>
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">{children}</Modal.Body>
    </Modal>
  );
};

export default Popup;
