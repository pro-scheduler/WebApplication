import { FiSettings } from 'react-icons/fi';
import Icon from './Icon';

const SettingsIcon = ({ className }: { className?: string }) => {
  return <Icon className={className} icon={<FiSettings />} />;
};

export default SettingsIcon;
