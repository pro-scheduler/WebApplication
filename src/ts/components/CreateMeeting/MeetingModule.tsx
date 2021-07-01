import styles from './MeetingModule.module.css';
import { MouseEventHandler } from 'react';
import { TiTick } from 'react-icons/ti';

export type MeetingModuleProps = {
  header: string;
  icon: JSX.Element;
  description: string;
  onClick: MouseEventHandler;
  chosen?: boolean;
};

const MeetingModule = ({
  header,
  icon,
  description,
  onClick,
  chosen = false,
}: MeetingModuleProps) => {
  return (
    <div className={styles.meetingModuleContainer} onClick={onClick}>
      {icon}
      <p className="mt-4">{header}</p>
      <p className={styles.moduleDescription}>{description}</p>
      {chosen && <TiTick className={styles.tick} />}
    </div>
  );
};

export default MeetingModule;
