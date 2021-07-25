import Countdown from 'react-countdown';
import { MdAlarm } from 'react-icons/md';
import styles from './Timer.module.css';

export type TimerProps = {
  date: Date | number | string | undefined;
  completedMessage?: string;
  nonCompletedMessage?: string;
  noEndDateMessage: string;
};

const Timer = ({ date, completedMessage, nonCompletedMessage, noEndDateMessage }: TimerProps) => {
  const renderer = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    completed: boolean;
  }) => {
    return (
      <p>
        <MdAlarm className={styles.clockIcon} />
        {completed ? (
          completedMessage
        ) : (
          <span>
            {nonCompletedMessage} {days > 0 && days + 'd'} {hours > 0 && hours + 'h'}{' '}
            {minutes > 0 && minutes + 'min'} {seconds}s
          </span>
        )}
      </p>
    );
  };
  return (
    <>
      {date ? (
        <Countdown renderer={renderer} date={date} />
      ) : (
        <p>
          <MdAlarm className={styles.clockIcon} />
          {noEndDateMessage}
        </p>
      )}
    </>
  );
};

export default Timer;
