import moment from 'moment';
import React from 'react';
import { useState } from 'react';
import { BsFillCursorFill, BsX } from 'react-icons/bs';
import { MeetingChatMessageDetails } from '../../../model/meetingChat/MeetingChatMessage';
import TextArea from '../../common/forms/TextArea/TextArea';
import LetterIcon from '../../common/Icons/LetterIcon';
import styles from './MeetingChat.module.css';

export type MeetingChatProps = {
  userId: number;
  messages: MeetingChatMessageDetails[];
  onSendNewMessage: Function;
};

const MeetingChat = ({ userId, messages, onSendNewMessage }: MeetingChatProps) => {
  const [newMessage, setNewMessage] = useState<string>('');

  const messageContainerRef = React.useRef<HTMLDivElement>(null);

  const sendMessage = () => {
    onSendNewMessage(newMessage);
    setNewMessage('');
    // messageContainerRef.current?.scroll(messageContainerRef.current.)
  };

  const ownMessageEntry = (message: MeetingChatMessageDetails) => {
    return (
      <div className={`${styles.singleMessageContainer} ${styles.messageRight}`}>
        <div className={`${styles.messageContentContainer} ${styles.messageOwn}`}>
          <div className={styles.messageText}>{message.message}</div>
          <div className={styles.messageDateTime}>
            {moment(message.creationDateTime).format('d MMM HH:mm')}
          </div>
        </div>
        <LetterIcon
          firstLetter={message.sendBy.email.charAt(0)}
          className={styles.messageSenderIcon}
        />
      </div>
    );
  };

  const otherMessageEntry = (message: MeetingChatMessageDetails) => {
    return (
      <div className={`${styles.singleMessageContainer} ${styles.messageLeft}`}>
        <LetterIcon
          firstLetter={message.sendBy.email.charAt(0)}
          className={styles.messageSenderIcon}
        />
        <div className={`${styles.messageContentContainer} ${styles.messageOther}`}>
          <div className={styles.messageText}>{message.message}</div>
          <div className={styles.messageDateTime}>
            {moment(message.creationDateTime).format('d MMM HH:mm')}
          </div>
        </div>
      </div>
    );
  };

  const messageEntry = (message: MeetingChatMessageDetails) => {
    return message.sendBy.id === userId ? ownMessageEntry(message) : otherMessageEntry(message);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>Meeting chat</div>
        <BsX className={styles.closeIcon} />
      </div>
      <div className={styles.messagesContainer} ref={messageContainerRef}>
        {messages?.map((message: MeetingChatMessageDetails, index: number) =>
          messageEntry(message)
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
  );
};

export default MeetingChat;
