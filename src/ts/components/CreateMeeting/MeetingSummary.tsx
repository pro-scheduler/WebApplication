import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import React from 'react';
import { TimeRangeDTO } from '../../model/TimeRangeDTO';
import { SurveyWithQuestionsDTO } from '../../model/survey/Survey';
import { Question } from '../../model/survey/Question';
import styles from './MeetingSummary.module.css';

export type MeetingSummaryProps = {
  name: string;
  description: string;
  emails: string[];
  onlineLink: string;
  onlinePassword: string;
  timeRanges: TimeRangeDTO[];
  survey: SurveyWithQuestionsDTO;
};

const MeetingSummary = ({
  name,
  description,
  emails,
  onlineLink,
  onlinePassword,
  timeRanges,
  survey,
}: MeetingSummaryProps) => {
  return (
    <Row className="justify-content-center mt-5">
      <Col xs="auto">
        <p className={styles.summaryHeader}>What: </p>
        <p>{name}</p>
        {description && <p>Description: {description}</p>}
        {timeRanges.length > 0 && (
          <>
            <p className={styles.summaryHeader}>When: </p>
            {timeRanges.map((timeRange: TimeRangeDTO) => (
              <p>
                {timeRange.startDateTime.getDay()}.{timeRange.startDateTime.getMonth()}.
                {timeRange.startDateTime.getFullYear()} {timeRange.startDateTime.getHours()}:
                {timeRange.startDateTime.getMinutes()}-{timeRange.endDateTime.getHours()}:
                {timeRange.endDateTime.getMinutes()}
              </p>
            ))}
          </>
        )}
        {emails.length > 0 && (
          <>
            <p className={styles.summaryHeader}>Who: </p>
            {emails.map((email: string) => (
              <p>- {email}</p>
            ))}
          </>
        )}
        {onlineLink && (
          <>
            <p className={styles.summaryHeader}>Where:</p>
            <p>{onlineLink}</p>
          </>
        )}
        {onlinePassword && <p>{onlinePassword}</p>}
        {survey.questions.length > 0 && (
          <>
            <p className={styles.summaryHeader}>Why:</p>
            <p>{survey.description}</p>
            {survey.questions.map((question: Question) => (
              <p>
                - {question.question} ({question.type})
              </p>
            ))}
          </>
        )}
      </Col>
    </Row>
  );
};

export default MeetingSummary;
