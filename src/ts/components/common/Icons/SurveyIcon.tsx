import { FaRegClipboard } from 'react-icons/fa';
import Icon from './Icon';

const SurveyIcon = ({ className }: { className?: string }) => {
  return <Icon className={className} icon={<FaRegClipboard />} />;
};

export default SurveyIcon;
