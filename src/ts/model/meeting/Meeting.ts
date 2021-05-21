import { TimeRangeDTO } from '../TimeRangeDTO';
import { BasicUserInfoDTO, ProUser } from '../user/ProUser';

export enum MeetingType {
  ONLINE = 'ONLINE',
  REAL = 'REAL',
}

export type Meeting = {
  id: number;
  name: string;
  description: string;
  availableTimeRanges: TimeRangeDTO[];
  organizers: ProUser[];
  participants: ProUser[];
  type: MeetingType;
};

export type MeetingDTO = {
  id: number;
  name: string;
  description: string;
  availableTimeRanges: TimeRangeDTO[];
  organizers: number[];
  participants: number[];
  type: MeetingType;
};

export class OnlineMeeting implements Meeting {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public availableTimeRanges: TimeRangeDTO[],
    public participants: ProUser[],
    public organizers: ProUser[],
    public link: string,
    public password: string,
    public type: MeetingType = MeetingType.ONLINE
  ) {}
}

export class RealMeeting implements Meeting {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public availableTimeRanges: TimeRangeDTO[],
    public participants: ProUser[],
    public organizers: ProUser[],
    public type: MeetingType = MeetingType.REAL
  ) {}
}

export type BasicMeetingDetailsDTO = {
  id: number;
  name: string;
  description: string;
};

export type MeetingDetailsDTO = {
  name: string;
  description: string;
  availableTimeRanges: TimeRangeDTO[];
  type: MeetingType;
};

export type DeepMeetingDetailsDTO = {
  id: number;
  name: string;
  description: string;
  availableTimeRanges: TimeRangeDTO[];
  participants: BasicUserInfoDTO[];
  organizers: BasicUserInfoDTO[];
  type: MeetingType;
};

export class OnlineDeepMeetingDetailsDTO implements DeepMeetingDetailsDTO {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public availableTimeRanges: TimeRangeDTO[],
    public participants: BasicUserInfoDTO[],
    public organizers: BasicUserInfoDTO[],
    public link: string,
    public password: string,
    public type: MeetingType = MeetingType.ONLINE
  ) {}
}

export class OnlineMeetingDetailsDTO implements MeetingDetailsDTO {
  constructor(
    public name: string,
    public description: string,
    public availableTimeRanges: TimeRangeDTO[],
    public link: string,
    public password: string,
    public type: MeetingType = MeetingType.ONLINE
  ) {}
}

export class RealDeepMeetingDetailsDTO implements DeepMeetingDetailsDTO {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public availableTimeRanges: TimeRangeDTO[],
    public participants: BasicUserInfoDTO[],
    public organizers: BasicUserInfoDTO[],
    public type: MeetingType = MeetingType.REAL
  ) {}
}

export class RealMeetingDetailsDTO implements MeetingDetailsDTO {
  constructor(
    public name: string,
    public description: string,
    public availableTimeRanges: TimeRangeDTO[],
    public type: MeetingType = MeetingType.REAL
  ) {}
}
