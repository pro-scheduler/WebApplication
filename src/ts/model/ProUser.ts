import Meeting from './Meeting';

export default interface ProUser {
  id: number;
  organizedMeetings: Meeting[];
  participatedMeetings: Meeting[];
}
