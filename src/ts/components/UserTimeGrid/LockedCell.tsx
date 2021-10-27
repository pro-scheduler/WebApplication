import styles from './UserTimeGrid.module.scss';
import { useHistory } from 'react-router-dom';

export type LockCellProps = {
  height: number;
  top: any;
  color?: string;
  label?: string;
  secondLabel?: string;
  meetingId?: number;
  borderRadius?: boolean;
  currentTime?: boolean;
};
const LockedCell = ({
  height,
  top,
  color = 'var(--light-grey)',
  label,
  secondLabel,
  meetingId,
  borderRadius = false,
  currentTime = false,
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
        zIndex: currentTime ? 6 : meetingId ? 5 : 0,
        borderRadius: borderRadius ? `var(--border-radius)` : 0,
      }}
      onClick={meetingId ? () => history.push('/meetings/' + meetingId) : () => void 0}
    >
      <div
        style={{
          textAlign: 'center',
          color: 'white',
          fontSize: '12px',
        }}
      >
        {label}
      </div>
      {height >= 32 && (
        <div
          style={{
            textAlign: 'center',
            color: 'white',
            fontSize: '10px',
          }}
        >
          {secondLabel}
        </div>
      )}
    </div>
  );
};

export default LockedCell;
