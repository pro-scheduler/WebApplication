import styles from './TimeGrid.module.scss';
const Cell = () => {
  const onClick = () => console.log('click');

  return <div role="button" onClick={onClick} className={styles.cell}></div>;
};

export default Cell;
