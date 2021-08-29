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
