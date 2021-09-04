import styles from './LetterIcon.module.css';

const LetterIcon = ({
  firstLetter,
  backgroundColor,
}: {
  firstLetter: string;
  backgroundColor?: string;
}) => {
  return (
    <div
      className={styles.userIcon}
      style={{ backgroundColor: backgroundColor ? backgroundColor : 'var(--purple)' }}
    >
      {firstLetter.toUpperCase()}
    </div>
  );
};

export default LetterIcon;
