import styles from './UserTimeGrid.module.scss';

export type LockCellProps = {
  height: number;
  top: any;
};
const LockedCell = ({ height, top }: LockCellProps) => {
  return <div className={styles.locked_cell} style={{ top: top, height: height }}></div>;
};

export default LockedCell;
