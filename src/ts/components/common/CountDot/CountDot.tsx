import styles from './CountDot.module.css';

const CountDot = ({
  count,
  display = false,
  style = {},
}: {
  style?: any;
  count: number;
  display: boolean;
}) => {
  return display ? (
    <div className={styles.iconCount} style={style}>
      {count}
    </div>
  ) : (
    <></>
  );
};

export default CountDot;
