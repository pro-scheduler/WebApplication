import { FaLayerGroup } from 'react-icons/fa';
import Icon from './Icon';

const ModuleIcon = ({ className }: { className?: string }) => {
  return <Icon className={className} icon={<FaLayerGroup />} />;
};

export default ModuleIcon;
