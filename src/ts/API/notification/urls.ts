export const getNotificationsUrl = () =>
  `${process.env.REACT_APP_NOTIFICATION_SERVICE_URL}notifications`;

// meeting reminders
export const getCreateUpdateReminderUrl = () => getNotificationsUrl() + '/meeting';

export const getDeleteReminderUrl = (meetingId: number) =>
  getNotificationsUrl() + `/meeting/${meetingId}`;

// meeting time reminders
export const getCreateUpdateTimeReminderUrl = () => getNotificationsUrl() + '/meeting/time';

export const getDeleteTimeReminderUrl = (meetingId: number) =>
  getNotificationsUrl() + `/meeting/time/${meetingId}`;

// survey reminder
export const getCreateSurveyReminderUrl = () => getNotificationsUrl() + '/survey';

export const getCreateUpdateSurveyTimeReminderUrl = () => getNotificationsUrl() + '/survey/time';

export const getDeleteSurveyTimeReminderUrl = (surveyId: number) =>
  getNotificationsUrl() + `/survey/time/${surveyId}`;
