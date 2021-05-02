import React from 'react';
import Modal from 'react-bootstrap/Modal';
import ActionButton from '../SubmitButton/ActionButton/ActionButton';
import styles from './Popup.module.css';

interface IPopup {
  show: boolean;
  information: string;
  onAccept: Function;
  onDecline: Function;
}

const Popup = (popup: IPopup) => {
  return (
    <Modal
      show={popup.show}
      onHide={popup.onDecline}
      animation={false}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className={styles.popupTitle}>
          {popup.information}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <ActionButton
          onclick={() => popup.onAccept()}
          text={'Yes'}
          className={styles.popupYesButton}
        />
        <ActionButton
          onclick={() => popup.onDecline()}
          text={'No'}
          className={styles.popupNoButton}
        />
      </Modal.Body>
    </Modal>
  );
};

export default Popup;
