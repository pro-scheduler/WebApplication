import { TiPlus } from 'react-icons/ti';
import styles from './DeleteButton.module.css';

const DeleteButton = ({ onDelete }: { onDelete: Function }) => {
  return <TiPlus className={styles.deleteCross} onClick={() => onDelete()} />;
};

export default DeleteButton;
