export enum TimeUnit {
  HOURS = 'HOURS',
  DAYS = 'DAYS',
  MINUTES = 'MINUTES',
}

export type ReminderInfo = {
  timeUnit: TimeUnit;
  value: number;
  sendReminder: boolean;
};

export type SurveyReminderRequest = {
  meetingId: number;
  surveyId: number;
  meetingName: string;
  toAll: boolean;
};

export type SurveyTimeReminderRequest = {
  meetingId: number;
  surveyId: number;
  reminderInfo: ReminderInfo;
  originalSurveyTime: Date;
};

export type MeetingTimeReminderRequest = {
  meetingId: number;
  meetingName: string;
  reminderInfo: ReminderInfo;
  timePreferencesDeadline: Date;
};

export type MeetingReminderRequest = {
  meetingId: number;
  meetingName: string;
  reminderInfo: ReminderInfo;
  originalMeetingTime: Date;
};

export type NotificationSettings = {
  timeUnit: TimeUnit;
  value: number;
  sendNotification: boolean;
};

export type CustomMessage = {
  meetingId: number;
  meetingName: string;
  message: string;
};
