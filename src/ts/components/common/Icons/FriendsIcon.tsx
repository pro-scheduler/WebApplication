import { FaUserFriends } from 'react-icons/fa';
import Icon from './Icon';

const FriendsIcon = ({ className }: { className?: string }) => {
  return <Icon className={className} icon={<FaUserFriends />} />;
};

export default FriendsIcon;
