import React from 'react';
import ActionButton from '../SubmitButton/ActionButton/ActionButton';
import styles from './YesNoPopup.module.css';
import Popup from './Popup';

export type PopupProps = {
  show: boolean;
  title: string;
  onAccept: Function;
  onDecline: Function;
};

const YesNoPopup = ({ show, title, onAccept, onDecline }: PopupProps) => {
  return (
    <Popup show={show} title={title} onClose={onDecline}>
      <ActionButton onclick={() => onAccept()} text={'Yes'} className={styles.popupYesButton} />
      <ActionButton onclick={() => onDecline()} text={'No'} className={styles.popupNoButton} />
    </Popup>
  );
};

export default YesNoPopup;
