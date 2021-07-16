import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './CreateInvitations.module.css';
import { useState } from 'react';
import { ValueLabelPair } from '../../model/utils/ValueLabelPair';
import FriendsIcon from '../common/Icons/FriendsIcon';
import { creatingMeetingState } from '../../views/CreateMeeting/CreateMeeting';
import Card from '../common/Card/Card';
import TextArea from '../common/forms/TextArea/TextArea';
import SingleValueInput from '../common/forms/Input/SingleValueInput';
import DeleteButton from '../common/SubmitButton/ActionButton/DeleteButton';
import ActionButton from '../common/SubmitButton/ActionButton/ActionButton';
import { validateEmail } from '../../tools/validator';
import UserNameIcon from '../common/Icons/UserNameIcon';

export type CreateInvitationsProps = {
  state: creatingMeetingState;
  showIcon: boolean;
  emails: ValueLabelPair[];
  setEmails: (newEmails: ValueLabelPair[]) => void;
};

const CreateInvitations = ({ state, showIcon, emails, setEmails }: CreateInvitationsProps) => {
  // eslint-disable-next-line
  const [invitationMessage, setInvitationMessage] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const addEmail = () => {
    if (!emails.find((e) => e.value === email) && validateEmail(email)) {
      setEmails([...emails, new ValueLabelPair(email, email)]);
      setEmail('');
    }
  };

  const removeEmail = (email: string | boolean | number) => () => {
    setEmails([...emails.filter((e) => e.value !== email)]);
  };

  const handleKeyDown = (event: any) => {
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        addEmail();
        event.preventDefault();
        break;
    }
  };

  return (
    <div
      className={
        state !== 'invitations' && (state !== 'summary' || emails.length === 0) ? styles.hidden : ''
      }
    >
      {showIcon && (
        <>
          <Row className="justify-content-center mt-5">
            <Col xs="auto">
              <FriendsIcon />
            </Col>
          </Row>

          <Row className="justify-content-center mt-4">
            <div className={styles.createHeader}>Invite participants</div>
          </Row>
        </>
      )}
      <Row className="justify-content-center mt-4 ml-sm-5">
        <Col sm={12} lg={6}>
          <Card title="Add participants">
            <div className={styles.participantContainer}>
              <div className={styles.participantInput}>
                <SingleValueInput
                  valueHandler={setEmail}
                  placeholder="Please type user email ..."
                  className={styles.participantInput}
                  handleKeyDown={handleKeyDown}
                  value={email}
                />
                <ActionButton
                  text="Add"
                  onclick={() => {
                    addEmail();
                  }}
                  className={styles.buttonAdd}
                />
              </div>
              <hr className={styles.topHr} />
              <div className={styles.selectedParticipants}>
                {emails.length > 0 &&
                  emails.map((email, i) => (
                    <div key={i}>
                      <div className={styles.participantRow}>
                        <div className={styles.userNameIcon}>
                          <UserNameIcon email={email.value.toString()} />
                        </div>
                        <div className={styles.deleteContainer}>
                          <DeleteButton onDelete={removeEmail(email.value)} />
                        </div>
                      </div>
                      <hr className={styles.hrLine} />
                    </div>
                  ))}
              </div>
            </div>
          </Card>
        </Col>
        <Col sm={12} lg={6}>
          <Card title="Invitation message">
            <TextArea
              className={styles.invitationMessage}
              valueHandler={setInvitationMessage}
              placeholder="Type invitation message here ..."
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CreateInvitations;
