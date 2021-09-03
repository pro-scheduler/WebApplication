export const getNotificationsUrl = () =>
  `${process.env.REACT_APP_NOTIFICATION_SERVICE_URL}notifications`;

// meeting reminders
export const getCreateUpdateMeetingReminderUrl = () => getNotificationsUrl() + '/meeting';

export const getMeetingReminderUrl = (meetingId: number) =>
  getNotificationsUrl() + `/meeting/${meetingId}`;

// meeting time reminders
export const getCreateUpdateTimeReminderUrl = () => getNotificationsUrl() + '/meeting/time';

export const getTimeReminderUrl = (meetingId: number) =>
  getNotificationsUrl() + `/meeting/time/${meetingId}`;

// survey reminder
export const getCreateSurveyReminderUrl = () => getNotificationsUrl() + '/survey';

export const getCreateUpdateSurveyTimeReminderUrl = () => getNotificationsUrl() + '/survey/time';

export const getSurveyTimeReminderUrl = (surveyId: number) =>
  getNotificationsUrl() + `/survey/time/${surveyId}`;

export const getCustomNotificationUrl = () => getNotificationsUrl() + '/custom';
