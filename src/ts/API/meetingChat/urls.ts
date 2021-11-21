import { MeetingChatDirection } from './meetingChatService';

export const getMeetingChatMessagesUrl = (
  meetingId: number,
  messageTime: any,
  messageCount: number,
  direction: MeetingChatDirection
) =>
  `${process.env.REACT_APP_CHAT_SERVICE_URL}chat/meeting/${meetingId}?message-time=${messageTime}&message-count=${messageCount}&direction=${direction}`;

export const getCreateMeetingChatMessageUrl = (meetingId: number) =>
  `${process.env.REACT_APP_CHAT_SERVICE_URL}chat/meeting/${meetingId}`;

export const getChatSocketEndpoint = () => `${process.env.REACT_APP_CHAT_SERVICE_SOCKET_ENDPOINT}`;
