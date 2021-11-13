import { BiInfoCircle } from 'react-icons/bi';
import Icon from './Icon';

const AboutIcon = ({ className }: { className?: string }) => {
  return <Icon className={className} icon={<BiInfoCircle />} />;
};

export default AboutIcon;
