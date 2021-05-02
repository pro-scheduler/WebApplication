import Meeting from './meeting/Meeting';

export default interface ProUser {
  id: number;
  organizedMeetings: Meeting[];
  participatedMeetings: Meeting[];
}
