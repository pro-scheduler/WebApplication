import styles from './LetterIcon.module.css';

const LetterIcon = ({
  firstLetter,
  backgroundColor = 'var(--purple)',
}: {
  firstLetter: string;
  backgroundColor?: string;
}) => {
  return (
    <div className={styles.userIcon} style={{ backgroundColor: backgroundColor }}>
      {firstLetter.toUpperCase()}
    </div>
  );
};

export default LetterIcon;
