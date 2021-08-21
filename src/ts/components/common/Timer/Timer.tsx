import Countdown from 'react-countdown';
import { MdAlarm } from 'react-icons/md';
import styles from './Timer.module.css';

export type TimerProps = {
  date: Date | string | undefined;
  completedMessage?: string;
  nonCompletedMessage?: string;
  noEndDateMessage: string;
};

const Timer = ({ date, completedMessage, nonCompletedMessage, noEndDateMessage }: TimerProps) => {
  let currentDate = undefined;

  if (date) {
    currentDate = new Date(date);
    currentDate.setTime(currentDate.getTime() - currentDate.getTimezoneOffset() * 60 * 1000);
  }

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
        <Countdown renderer={renderer} date={currentDate} />
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
