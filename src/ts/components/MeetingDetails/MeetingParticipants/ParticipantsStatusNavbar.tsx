import { TiPlus, TiTick } from 'react-icons/ti';
import styles from './ParticipantsStatusNavbar.module.css';
import { BsEnvelope } from 'react-icons/bs';
import { State } from '../../../model/invitation/Invitation';
import cx from 'classnames';

export type ParticipantsStatusNavbarProps = {
  accepted: number;
  rejected: number;
  pending: number;
  setState: (state: State) => void;
  currentState: State;
};

const ParticipantsStatusNavbar = ({
  accepted,
  rejected,
  pending,
  setState,
  currentState,
}: ParticipantsStatusNavbarProps) => {
  return (
    <div className={styles.container}>
      <div
        onClick={() => setState(State.ACCEPTED)}
        className={cx(styles.itemContainer, currentState === State.ACCEPTED && styles.chosenItem)}
      >
        <div className={styles.item}>
          <div className={styles.number}>{accepted}</div>
          <TiTick className={styles.tickIcon} />
        </div>
        <div className={styles.description}>Accepted</div>
      </div>
      <div
        onClick={() => setState(State.PENDING)}
        className={cx(styles.itemContainer, currentState === State.PENDING && styles.chosenItem)}
      >
        <div className={styles.item}>
          <div className={styles.number}>{pending}</div>
          <BsEnvelope className={styles.envelopeIcon} />
        </div>
        <div className={styles.description}>Invited</div>
      </div>
      <div
        onClick={() => setState(State.REJECTED)}
        className={cx(styles.itemContainer, currentState === State.REJECTED && styles.chosenItem)}
      >
        <div className={styles.item}>
          <div className={styles.number}>{rejected}</div>
          <TiPlus className={styles.plusIcon} />
        </div>
        <div className={styles.description}>Can't go</div>
      </div>
    </div>
  );
};

export default ParticipantsStatusNavbar;
