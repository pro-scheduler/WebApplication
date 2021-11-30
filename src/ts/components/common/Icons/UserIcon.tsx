import { UserDetails, UserSummary } from '../../../model/user/ProUser';
import LetterIcon from './LetterIcon';
import styles from './UserIcon.module.css';

const UserIcon = ({
  user,
  backgroundColor = 'var(--primary)',
  className = '',
}: {
  user: UserSummary | UserDetails;
  backgroundColor?: string;
  className?: string;
}) => {
  return user.profilePictureUrl ? (
    <img
      className={`${styles.userIcon} ${className}`}
      style={{ backgroundColor: backgroundColor }}
      src={user.profilePictureUrl}
      alt={'profilePicture'}
    />
  ) : (
    <LetterIcon
      firstLetter={user.email.charAt(0)}
      backgroundColor={backgroundColor}
      className={className}
    />
  );
};

export default UserIcon;
