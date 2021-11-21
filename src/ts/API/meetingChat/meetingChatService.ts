import {
  CreateMeetingChatMessageRequest,
  MeetingChatMessageDetails,
} from '../../model/meetingChat/MeetingChatMessage';
import { get, post } from '../genericApiCalls';
import { getCreateMeetingChatMessageUrl, getMeetingChatMessagesUrl } from './urls';

export enum MeetingChatDirection {
  BEFORE = 'BEFORE',
  AFTER = 'AFTER',
}

export const loadNewMeetingChatMessages = (
  meetingId: number,
  lastMessageTime: any,
  setMeetingChatMessages: (messages: MeetingChatMessageDetails[]) => void,
  setResponse?: Function
) =>
  loadMeetingChatMessages(
    meetingId,
    lastMessageTime,
    10000,
    MeetingChatDirection.AFTER,
    setMeetingChatMessages,
    setResponse
  );

export const loadMeetingChatMessages = (
  meetingId: number,
  messageTime: any,
  messageCount: number,
  direction: MeetingChatDirection,
  setMeetingChatMessages: (messages: MeetingChatMessageDetails[]) => void,
  setResponse?: Function
) => {
  get(
    getMeetingChatMessagesUrl(meetingId, messageTime, messageCount, direction),
    setMeetingChatMessages,
    setResponse
  );
};

export const createNewMeetingChatMessage = (
  meetingId: number,
  createRequest: CreateMeetingChatMessageRequest,
  setData?: Function
) => post(createRequest, getCreateMeetingChatMessageUrl(meetingId), setData, undefined, true);
