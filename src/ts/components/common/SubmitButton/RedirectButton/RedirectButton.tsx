import { Link } from 'react-router-dom';
import ActionButton from '../ActionButton/ActionButton';

export type RedirectButtonProps = {
  redirectTO: string;
  text: string;
  className?: string;
  disabled?: boolean;
};

const RedirectButton = ({ redirectTO, text, className, disabled }: RedirectButtonProps) => {
  return (
    <Link to={redirectTO}>
      <ActionButton onclick={() => void 0} className={className} text={text} disabled={disabled} />
    </Link>
  );
};

export default RedirectButton;
