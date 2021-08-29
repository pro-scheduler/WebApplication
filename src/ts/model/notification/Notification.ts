export type SurveyReminderRequest = {
  meetingId: number;
  surveyId: number;
  meetingName: string;
  toAll: boolean;
};

export type SurveyTimeReminderRequest = {
  meetingId: number;
  surveyId: number;
  timeToSendNotification: Date;
  originalSurveyTime: Date;
};

export type MeetingTimeReminderRequest = {
  meetingId: number;
  meetingName: string;
  newTimeToSendNotification: Date;
  timePreferencesDeadline: Date;
};

export type MeetingReminderRequest = {
  meetingId: number;
  meetingName: string;
  newTimeToSendNotification: Date;
  originalMeetingTime: Date;
};
