import React from 'react';
import Modal from 'react-bootstrap/Modal';
import ActionButton from '../SubmitButton/ActionButton/ActionButton';
import styles from './Popup.module.css';

export type PopupProps = {
  show: boolean;
  information: string;
  onAccept: Function;
  onDecline: Function;
};

const Popup = ({ show, information, onAccept, onDecline }: PopupProps) => {
  return (
    <Modal
      show={show}
      onHide={onDecline}
      animation={false}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className={styles.popupTitle}>
          {information}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <ActionButton onclick={() => onAccept()} text={'Yes'} className={styles.popupYesButton} />
        <ActionButton onclick={() => onDecline()} text={'No'} className={styles.popupNoButton} />
      </Modal.Body>
    </Modal>
  );
};

export default Popup;
