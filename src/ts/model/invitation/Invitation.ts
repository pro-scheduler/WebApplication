import Meeting from '../meeting/Meeting';
import ProUser from '../user/ProUser';

export default interface Invitation {
  id: number;
  user: ProUser;
  meeting: Meeting;
  invitationState: State;
}

export enum State {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}
