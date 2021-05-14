import { MdLocationOn } from 'react-icons/md';
import Icon from './Icon';

const LocationIcon = ({ className }: { className?: string }) => {
  return <Icon className={className} icon={<MdLocationOn />} />;
};

export default LocationIcon;
