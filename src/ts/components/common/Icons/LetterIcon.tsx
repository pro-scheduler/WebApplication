import styles from './LetterIcon.module.css';

const LetterIcon = ({
  firstLetter,
  backgroundColor = 'var(--purple)',
  className = '',
}: {
  firstLetter: string;
  backgroundColor?: string;
  className?: string;
}) => {
  return (
    <div className={`${styles.userIcon} ${className}`} style={{ backgroundColor: backgroundColor }}>
      {firstLetter.toUpperCase()}
    </div>
  );
};

export default LetterIcon;
