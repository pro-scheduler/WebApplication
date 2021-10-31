import { useEffect, useState } from 'react';
import {
  addMeetingToGoogleCalendar,
  getCurrentGoogleCalendarUser,
  listUserGoogleCalendars,
} from '../../../API/googlecalendar/googleCalendarService';
import { GoogleCalendarSummary } from '../../../model/googlecalendar/GoogleCalendar';
import GoogleCalendarItem from './GoogleCalendarItem';
import styles from './GoogleCalendarPicker.module.css';
import { UserSummary } from '../../../model/user/ProUser';
import UserNameIcon from '../../common/Icons/UserNameIcon';
import { googleCalendarUrl } from '../../../auth/AuthCredentials';

export type GoogleCalendarPickerProps = {
  meetingId: number;
  onCalendarChosen: Function;
};

const GoogleCalendarPicker = ({ meetingId, onCalendarChosen }: GoogleCalendarPickerProps) => {
  const [googleCalendarUser, setGoogleCalendarUser] = useState<UserSummary>();
  const [availableGoogleCalendars, setAvailableGoogleCalendars] = useState<GoogleCalendarSummary[]>(
    []
  );

  const addToCalendar = (calendarId: string) => {
    addMeetingToGoogleCalendar(
      meetingId,
      calendarId,
      () => {},
      () => {},
      () => onCalendarChosen()
    );
  };

  useEffect(() => {
    getCurrentGoogleCalendarUser((data: any) => {
      setGoogleCalendarUser(data);
    });
    listUserGoogleCalendars((data: any) => {
      setAvailableGoogleCalendars(data);
    });
  }, []);

  return (
    <>
      <div className={styles.itemListContainer}>
        {availableGoogleCalendars.map((calendar: GoogleCalendarSummary, index: number) => (
          <GoogleCalendarItem
            onCalendarChosen={() => addToCalendar(calendar.id)}
            calendar={calendar}
            key={index}
          />
        ))}
      </div>
      <div className={styles.userInfoContainer}>
        <h6>Signed&nbsp;as</h6>
        {googleCalendarUser && (
          <UserNameIcon user={googleCalendarUser} email={googleCalendarUser.email} />
        )}
        <a href={googleCalendarUrl(meetingId)}>Change</a>
      </div>
    </>
  );
};

export default GoogleCalendarPicker;
