import { BsFillCursorFill } from 'react-icons/bs';

import Icon from './Icon';

const ChatSendIcon = ({ className }: { className?: string }) => {
  return <Icon className={className} icon={<BsFillCursorFill />} />;
};

export default ChatSendIcon;
