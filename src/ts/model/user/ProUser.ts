import Meeting from '../meeting/Meeting';

export default interface ProUser {
  id: number;
  email: string;
  organizedMeetings: Meeting[];
  participatedMeetings: Meeting[];
}
