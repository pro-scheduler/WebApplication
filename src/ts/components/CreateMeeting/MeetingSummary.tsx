import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import React from 'react';
import { TimeRangeDTO } from '../../model/TimeRangeDTO';
import { SurveyWithQuestionsDTO } from '../../model/survey/Survey';
import { Question } from '../../model/survey/Question';
import styles from './MeetingSummary.module.css';
import PencilIcon from '../common/Icons/PencilIcon';
import CalendarIcon from '../common/Icons/CalendarIcon';
import WorldIcon from '../common/Icons/WorldIcon';
import SurveyIcon from '../common/Icons/SurveyIcon';
import FriendsIcon from '../common/Icons/FriendsIcon';

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
    <Row className="justify-content-center mt-5 text-center">
      <Col xs="auto">
        <Row className="justify-content-center my-5">
          <Col xs="auto">
            <PencilIcon />
          </Col>
        </Row>
        <p>{name}</p>
        {description && <p>Description: {description}</p>}
        {timeRanges.length > 0 && (
          <>
            <Row className="justify-content-center my-5">
              <Col xs="auto">
                <CalendarIcon />
              </Col>
            </Row>
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
            <Row className="justify-content-center my-5">
              <Col xs="auto">
                <FriendsIcon />
              </Col>
            </Row>
            {emails.map((email: string) => (
              <p>{email}</p>
            ))}
          </>
        )}
        {onlineLink && (
          <>
            <Row className="justify-content-center my-5">
              <Col xs="auto">
                <WorldIcon />
              </Col>
            </Row>
            <p>{onlineLink}</p>
          </>
        )}
        {onlinePassword && <p>{onlinePassword}</p>}
        {survey.questions.length > 0 && (
          <>
            <Row className="justify-content-center my-5">
              <Col xs="auto">
                <SurveyIcon />
              </Col>
            </Row>
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
