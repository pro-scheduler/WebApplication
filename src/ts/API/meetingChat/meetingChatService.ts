import Stomp from 'stompjs';
import {
  CreateMeetingChatMessageRequest,
  MeetingChatMessageDetails,
} from '../../model/meetingChat/MeetingChatMessage';
import { get, post } from '../genericApiCalls';
import {
  getCreateMeetingChatMessageUrl,
  getMeetingChatMessagesUrl,
  getChatSocketEndpoint,
} from './urls';

export enum MeetingChatDirection {
  BEFORE = 'BEFORE',
  AFTER = 'AFTER',
}

export const subscribeToChat = (meetingId: number, onNewMessageEvent: Function) => {
  let chatSocket = new WebSocket(getChatSocketEndpoint());

  let ws = Stomp.over(chatSocket);
  ws.connect(
    {},
    (frame: any) =>
      ws.subscribe(`/api/chat/topic/${meetingId}/push`, (message: any) =>
        onNewMessageEvent(JSON.parse(message.body))
      ),
    (error: any) => console.log(`STOMP error: ${error}`)
  );

  return chatSocket;
};

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
  console.log(`messageTime T: ${typeof messageTime}`);
  console.log(`messageTime V: ${messageTime}`);
  console.log(`url: ${getMeetingChatMessagesUrl(meetingId, messageTime, messageCount, direction)}`);
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
