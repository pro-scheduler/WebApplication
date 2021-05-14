import { BiWorld } from 'react-icons/bi';
import Icon from './Icon';

const WorldIcon = ({ className }: { className?: string }) => {
  return <Icon className={className} icon={<BiWorld />} />;
};

export default WorldIcon;
