import { BsX } from 'react-icons/bs';

import Icon from './Icon';

const CloseIcon = ({ className }: { className?: string }) => {
  return <Icon className={className} icon={<BsX />} />;
};

export default CloseIcon;
