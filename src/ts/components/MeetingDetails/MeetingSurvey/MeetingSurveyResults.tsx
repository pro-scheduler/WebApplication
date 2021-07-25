import Card from '../../common/Card/Card';
import React, { useState } from 'react';
import styles from './MeetingSurveyResults.module.css';
import UserNameIcon from '../../common/Icons/UserNameIcon';
import ActionButton from '../../common/SubmitButton/ActionButton/ActionButton';
import Popup from '../../common/Popup/Popup';

export type MeetingSurveyResultsProps = {
  numberOfParticipants: number;
  numberOfFilledSurveys: number;
  emails: string[];
};

const MeetingSurveyResults = ({
  numberOfParticipants,
  numberOfFilledSurveys,
  emails,
}: MeetingSurveyResultsProps) => {
  const [showEmails, setShowEmails] = useState<boolean>(false);

  const userNameIcons = emails.map((email: string, index: number) => (
    <div className="my-3" key={index}>
      <UserNameIcon email={email} key={index} />
    </div>
  ));
  return (
    <Card
      title={'Results'}
      footer={
        <div className={styles.showEmailsContainer}>
          <ActionButton
            onclick={() => setShowEmails(true)}
            text={'Show who filled the survey'}
            className={styles.showEmailsButton}
          />
        </div>
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
