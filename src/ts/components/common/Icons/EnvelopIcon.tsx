import { BsFillEnvelopeFill } from 'react-icons/bs';

import Icon from './Icon';

const EnvelopIcon = ({ className }: { className?: string }) => {
  return <Icon className={className} icon={<BsFillEnvelopeFill />} />;
};

export default EnvelopIcon;
