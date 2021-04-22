import Meeting from './Meeting';

export default interface ProUser {
  userId: number;
  organizedMeetings: Meeting[];
  participatedMeetings: Meeting[];
}
