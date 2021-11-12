export const getMeetingChatMessagesUrl = (meetingId: number, page: number, size: number) =>
  `${process.env.REACT_APP_CHAT_SERVICE_URL}chat/meeting/${meetingId}?page=${page}&size=${size}`;

export const getCreateMeetingChatMessageUrl = (meetingId: number) =>
  `${process.env.REACT_APP_CHAT_SERVICE_URL}chat/meeting/${meetingId}`;

export const getChatSocketEndpoint = () => process.env.REACT_APP_CHAT_SERVICE_SOCKET_ENDPOINT;
