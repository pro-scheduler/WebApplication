import Card from '../../common/Card/Card';
import React, { useState } from 'react';
import styles from './MeetingSurveyResults.module.css';
import UserNameIcon from '../../common/Icons/UserNameIcon';
import ActionButton from '../../common/SubmitButton/ActionButton/ActionButton';
import Popup from '../../common/Popup/Popup';
import { UserSummary } from '../../../model/user/ProUser';

export type MeetingSurveyResultsProps = {
  numberOfParticipants: number;
  numberOfFilledSurveys: number;
  users: UserSummary[];
  isOrganizer: boolean;
};

const MeetingSurveyResults = ({
  numberOfParticipants,
  numberOfFilledSurveys,
  users,
  isOrganizer,
}: MeetingSurveyResultsProps) => {
  const [showEmails, setShowEmails] = useState<boolean>(false);

  const userNameIcons = users.map((user: UserSummary, index: number) => (
    <div className="my-3" key={index}>
      <UserNameIcon user={user} email={user.username} />
    </div>
  ));
  return (
    <Card
      title={'Results'}
      footer={
        isOrganizer ? (
          <div className={styles.showEmailsContainer}>
            <ActionButton
              onclick={() => setShowEmails(true)}
              text={'Show who filled the survey'}
              className={styles.showEmailsButton}
            />
          </div>
        ) : undefined
      }
    >
      <div className={styles.completedSurveysHeader}>
        {numberOfFilledSurveys} / {numberOfParticipants}
      </div>
      <div className={styles.completedSurveysInfo}>participants completed the survey</div>
      <Popup
        show={showEmails}
        title={'Participants who filled the survey'}
        onClose={() => setShowEmails(false)}
      >
        {userNameIcons}
      </Popup>
    </Card>
  );
};
export default MeetingSurveyResults;
