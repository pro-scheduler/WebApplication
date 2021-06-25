import styles from './UserTimeGrid.module.scss';

export type LockCellProps = {
  height: number;
  top: any;
  color?: string;
};
const LockedCell = ({ height, top, color }: LockCellProps) => {
  return (
    <div
      className={styles.locked_cell}
      style={{
        top: top,
        height: height,
        backgroundColor: color ? color : 'var(--light-grey)',
      }}
    />
  );
};

export default LockedCell;
