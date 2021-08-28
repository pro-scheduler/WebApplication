import { TimeRangeDTO } from '../TimeRangeDTO';
import { UserSummary } from '../user/ProUser';

export enum MeetingType {
  ONLINE = 'ONLINE',
  REAL = 'REAL',
}

export enum MeetingRole {
  ORGANIZER = 'ORGANIZER',
  ATTENDEE = 'ATTENDEE',
}

export enum MeetingState {
  OPEN = 'OPEN',
  CANCELLED = 'CANCELLED',
}

export type CreateMeetingRequest = {
  name: string;
  description: string;
  type: MeetingType;
  availableTimeRanges: TimeRangeDTO[] | undefined;
  markTimeRangeDeadline: Date | undefined;
  link: string | undefined;
  password: string | undefined;
};

export type UpdateMeetingRequest = {
  name: string | undefined;
  description: string | undefined;
  availableTimeRanges: TimeRangeDTO[] | undefined;
  finalDate: TimeRangeDTO | undefined;
  markTimeRangeDeadline: Date | undefined;
};

export class UpdateOnlineMeetingRequest {
  constructor(
    public name: string | undefined,
    public description: string | undefined,
    public availableTimeRanges: TimeRangeDTO[] | undefined,
    public finalDate: TimeRangeDTO | undefined,
    public markTimeRangeDeadline: Date | undefined,
    public link: string | undefined,
    public password: string | undefined
  ) {}
}

export class UpdateRealMeetingRequest {
  constructor(
    public name: string | undefined,
    public description: string | undefined,
    public availableTimeRanges: TimeRangeDTO[] | undefined,
    public finalDate: TimeRangeDTO | undefined,
    public markTimeRangeDeadline: Date | undefined
  ) {}
}

export type MeetingDetails = {
  id: number;
  name: string;
  description: string;
  availableTimeRanges: TimeRangeDTO[];
  attendees: MeetingAttendeeDetails[];
  type: MeetingType;
  state: MeetingState;
  markTimeRangeDeadline: string | undefined;
  finalDate: TimeRangeDTO;
};

export type MeetingSummary = {
  id: number;
  name: string;
  description: string;
  type: MeetingType;
  organizer: UserSummary;
  state: MeetingState;
};

export class OnlineMeetingDetails implements MeetingDetails {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public availableTimeRanges: TimeRangeDTO[],
    public attendees: MeetingAttendeeDetails[],
    public link: string,
    public password: string,
    public type: MeetingType = MeetingType.ONLINE,
    public state: MeetingState,
    public markTimeRangeDeadline: string | undefined,
    public finalDate: TimeRangeDTO
  ) {}
}

export class RealMeetingDetails implements MeetingDetails {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public availableTimeRanges: TimeRangeDTO[],
    public attendees: MeetingAttendeeDetails[],
    public type: MeetingType = MeetingType.REAL,
    public state: MeetingState,
    public markTimeRangeDeadline: string | undefined,
    public finalDate: TimeRangeDTO
  ) {}
}

export class MeetingAttendeeDetails {
  constructor(
    public attendeeId: number,
    public user: UserSummary,
    public invitedBy: UserSummary,
    public markedTimeRanges: TimeRangeDTO[],
    public role: MeetingRole = MeetingRole.ATTENDEE
  ) {}
}
