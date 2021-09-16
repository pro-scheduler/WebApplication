import { FaMapMarkedAlt } from 'react-icons/fa';
import Icon from './Icon';

const MapIcon = ({ className }: { className?: string }) => {
  return <Icon className={className} icon={<FaMapMarkedAlt />} />;
};

export default MapIcon;
