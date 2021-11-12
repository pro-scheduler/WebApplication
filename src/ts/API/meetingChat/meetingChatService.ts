import Stomp from 'stompjs';
import { CreateMeetingChatMessageRequest } from '../../model/meetingChat/MeetingChatMessage';
import { get, post } from '../genericApiCalls';
import {
  getCreateMeetingChatMessageUrl,
  getMeetingChatMessagesUrl,
  getChatSocketEndpoint,
} from './urls';

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

export const loadMeetingChatMessages = (
  meetingId: number,
  page: number,
  size: number,
  setMeetingChatMessages: Function,
  setResponse?: Function
) => get(getMeetingChatMessagesUrl(meetingId, page, size), setMeetingChatMessages, setResponse);

export const createNewMeetingChatMessage = (
  meetingId: number,
  createRequest: CreateMeetingChatMessageRequest,
  setData?: Function
) => post(createRequest, getCreateMeetingChatMessageUrl(meetingId), setData, undefined, true);
