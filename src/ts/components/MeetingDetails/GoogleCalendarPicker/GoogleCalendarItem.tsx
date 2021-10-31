import { GoogleCalendarSummary } from '../../../model/googlecalendar/GoogleCalendar';

import styles from './GoogleCalendarPicker.module.css';

export type GoogleCalendarItemProps = {
  calendar: GoogleCalendarSummary;
  onCalendarChosen: Function;
};

const GoogleCalendarItem = ({ calendar, onCalendarChosen }: GoogleCalendarItemProps) => {
  return (
    <div className={styles.itemContainer} onClick={() => onCalendarChosen()}>
      <h5 className={styles.itemTitle}>{calendar.summary}</h5>
      <p className={styles.itemDescription}>{calendar.description}&nbsp;</p>
    </div>
  );
};

export default GoogleCalendarItem;
