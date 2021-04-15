import { FcBusinesswoman, FcManager } from 'react-icons/fc';
import './AuthDecoration.css';

const AuthDecoration = () => {
  return (
    <div>
      <div className="mx-3 personIcon personIcon1">
        <FcBusinesswoman />
      </div>
      <div className="mx-3 personIcon  personIcon2">
        <FcManager />
      </div>
      <div className="mx-3 personIcon  personIcon3">
        <FcBusinesswoman />
      </div>
      <div className="mx-3 personIcon  personIcon1">
        <FcManager />
      </div>
      <div className="mx-3 personIcon  personIcon2">
        <FcBusinesswoman />
      </div>
      <div className="mx-3 personIcon personIcon3">
        <FcManager />
      </div>
    </div>
  );
};

export default AuthDecoration;
