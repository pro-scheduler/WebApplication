import { BsFillChatFill } from 'react-icons/bs';

import Icon from './Icon';

const ChatIcon = ({ className }: { className?: string }) => {
  return <Icon className={className} icon={<BsFillChatFill />} />;
};

export default ChatIcon;
