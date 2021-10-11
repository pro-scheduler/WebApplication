import styles from './UserTimeGrid.module.scss';
import { useHistory } from 'react-router-dom';

export type LockCellProps = {
  height: number;
  top: any;
  color?: string;
  label?: string;
  meetingId?: number;
};
const LockedCell = ({
  height,
  top,
  color = 'var(--light-grey)',
  label,
  meetingId,
}: LockCellProps) => {
  const history = useHistory();

  return (
    <div
      className={styles.locked_cell}
      style={{
        top: top,
        height: height,
        backgroundColor: color,
        cursor: meetingId ? 'pointer' : 'none',
        zIndex: meetingId ? 5 : 0,
      }}
      onClick={meetingId ? () => history.push('/meetings/' + meetingId) : () => void 0}
    >
      <div
        style={{
          textAlign: 'center',
          color: 'white',
        }}
      >
        {label}
      </div>
    </div>
  );
};

export default LockedCell;
