import styles from './LetterIcon.module.css';

const LetterIcon = ({ firstLetter }: { firstLetter: string }) => {
  return <div className={styles.userIcon}>{firstLetter.toUpperCase()}</div>;
};

export default LetterIcon;
