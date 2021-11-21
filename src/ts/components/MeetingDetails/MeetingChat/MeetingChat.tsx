import moment from 'moment';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { BsFillCursorFill, BsX } from 'react-icons/bs';
import { MeetingChatMessageDetails } from '../../../model/meetingChat/MeetingChatMessage';
import TextArea from '../../common/forms/TextArea/TextArea';
import ChatIcon from '../../common/Icons/ChatIcon';
import styles from './MeetingChat.module.css';
import UserIcon from '../../common/Icons/UserIcon';
import { BiLoaderAlt } from 'react-icons/all';

export type MeetingChatProps = {
  userId: number;
  messages: MeetingChatMessageDetails[];
  onSendNewMessage: Function;
  onLoadOlderMessages: Function;
  isLoadingOlderMessages: boolean;
  noMoreOldMessages: boolean;
};

const MeetingChat = ({
  userId,
  messages,
  onSendNewMessage,
  onLoadOlderMessages,
  isLoadingOlderMessages,
  noMoreOldMessages,
}: MeetingChatProps) => {
  const [chatVisible, setChatVisible] = useState<boolean>(false);
  const [newMessage, setNewMessage] = useState<string>('');

  const messageContainerRef = React.useRef<HTMLDivElement>(null);
  const lastMessagePositionRef = React.useRef(0);

  const sendMessage = () => {
    onSendNewMessage(newMessage);
    setNewMessage('');
  };

  const ownMessageEntry = (message: MeetingChatMessageDetails, index: number) => {
    return (
      <div className={`${styles.singleMessageContainer} ${styles.messageRight}`} key={index}>
        <div className={`${styles.messageContentContainer} ${styles.messageOwn}`}>
          <div className={styles.messageText}>{message.message}</div>
          <div className={styles.messageDateTime}>
            {moment(message.creationDateTime).format('DD MMM HH:mm')}
          </div>
        </div>
        <UserIcon user={message.sendBy} className={styles.messageSenderIcon} />
      </div>
    );
  };

  const otherMessageEntry = (message: MeetingChatMessageDetails, index: number) => {
    return (
      <div className={`${styles.singleMessageContainer} ${styles.messageLeft}`} key={index}>
        <UserIcon user={message.sendBy} className={styles.messageSenderIcon} />
        <div className={`${styles.messageContentContainer} ${styles.messageOther}`}>
          <div className={styles.messageText}>{message.message}</div>
          <div className={styles.messageDateTime}>
            {moment(message.creationDateTime).format('DD MMM HH:mm')}
          </div>
        </div>
      </div>
    );
  };

  const messageEntry = (message: MeetingChatMessageDetails, index: number) => {
    return message.sendBy.id === userId
      ? ownMessageEntry(message, index)
      : otherMessageEntry(message, index);
  };

  const toggleChat = () => setChatVisible(!chatVisible);

  const loadOlderMessagesIfNeeded = (event: any) => {
    if (messageContainerRef.current?.scrollTop === 0 && event.deltaY < 0 && !noMoreOldMessages) {
      onLoadOlderMessages();
    }
  };

  useEffect(() => {
    if (messageContainerRef.current) {
      if (messageContainerRef.current.scrollTop >= lastMessagePositionRef.current) {
        messageContainerRef.current.scrollTop = messageContainerRef.current?.scrollHeight;
      }
      lastMessagePositionRef.current =
        messageContainerRef.current.scrollHeight - messageContainerRef.current.offsetHeight;
    }
  }, [messages]);

  return (
    <div>
      <div
        className={`${styles.button} ${chatVisible ? styles.invisible : styles.visible}`}
        onClick={toggleChat}
      >
        <ChatIcon />
      </div>
      <div className={`${styles.container} ${chatVisible ? styles.visible : styles.invisible}`}>
        <div className={styles.header}>
          <div>Meeting chat</div>
          <BsX className={styles.closeIcon} onClick={toggleChat} />
        </div>
        <div
          className={styles.messagesContainer}
          ref={messageContainerRef}
          onWheel={(event) => loadOlderMessagesIfNeeded(event)}
        >
          {isLoadingOlderMessages && <BiLoaderAlt className={styles.loadingInfoIcon} />}
          {messages?.map((message: MeetingChatMessageDetails, index: number) =>
            messageEntry(message, index)
          )}
        </div>
        <div className={styles.footer}>
          <TextArea
            placeholder="Type your message here"
            valueHandler={setNewMessage}
            value={newMessage}
            className={styles.chatInput}
          />
          <BsFillCursorFill onClick={sendMessage} className={styles.sendIcon} />
        </div>
      </div>
    </div>
  );
};

export default MeetingChat;
