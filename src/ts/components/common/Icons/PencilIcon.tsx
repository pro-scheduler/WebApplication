import { RiPencilFill } from 'react-icons/ri';
import Icon from './Icon';

const PencilIcon = ({ className }: { className?: string }) => {
  return <Icon className={className} icon={<RiPencilFill />} />;
};

export default PencilIcon;
