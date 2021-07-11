import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import SurveyIcon from '../common/Icons/SurveyIcon';
import PlusButton from '../common/RoundButtons/PlusButton';
import styles from './CreateSurvey.module.css';
import QuestionCreate from './QuestionCreate';
import React, { useEffect, useState } from 'react';
import { TiDelete } from 'react-icons/ti';
import TextArea from '../common/forms/TextArea/TextArea';
import { SurveyWithQuestionsDTO } from '../../model/survey/Survey';
import { Question } from '../../model/survey/Question';
import { creatingMeetingState } from '../../views/CreateMeeting/CreateMeeting';
import DayPicker from 'react-day-picker';
import TimePicker, { TimePickerValue } from 'react-time-picker';

export type CreateSurveyProps = {
  state: creatingMeetingState;
  survey: SurveyWithQuestionsDTO;
};

const CreateSurvey = ({ state, survey }: CreateSurveyProps) => {
  const [questions, setQuestions] = useState<number[]>([]);
  const [questionId, setQuestionId] = useState(0);
  const [finalDate, setFinalDate] = useState<Date | undefined>(undefined);
  const [finalTime, setFinalTime] = useState<TimePickerValue>('00:00');

  const createNewQuestion = () => {
    setQuestions([...questions, questionId]);
    setQuestionId(questionId + 1);
  };

  const updateQuestion = (questionToUpdate: Question) => {
    survey.questions = survey.questions.filter(
      (question: Question) => question.id !== questionToUpdate.id
    );
    survey.questions.push(questionToUpdate);
  };

  const deleteQuestion = (idToDelete: number) => {
    survey.questions = survey.questions.filter((question: Question) => question.id !== idToDelete);
    setQuestions(questions.filter((id: number) => idToDelete !== id));
  };

  const saveSurveyDescription = (description: string) => {
    survey.description = description;
  };

  useEffect(() => {
    setQuestions([]);
  }, []);

  useEffect(() => {
    survey.surveyEndDate = finalDate;
    // eslint-disable-next-line
  }, [finalDate]);

  const updateDate = (date: Date) => {
    date.setMinutes(parseInt(finalTime.toString().slice(-2)));
    date.setHours(parseInt(finalTime.toString().slice(0, 2)));
    date.setTime(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
    setFinalDate(date.getDate() === finalDate?.getDate() ? undefined : date);
  };

  const updateTime = (time: TimePickerValue) => {
    finalDate?.setMinutes(parseInt(time.toString().slice(-2)));
    finalDate?.setHours(parseInt(time.toString().slice(0, 2)));
    finalDate?.setTime(finalDate.getTime() - finalDate.getTimezoneOffset() * 60 * 1000);
    setFinalTime(time);
    survey.surveyEndDate = finalDate;
  };

  return (
    <div
      className={
        state !== 'survey' && (state !== 'summary' || questions.length === 0) ? styles.hidden : ''
      }
    >
      <Row className="justify-content-center mt-5">
        <Col xs="auto">
          <SurveyIcon />
        </Col>
      </Row>

      <Row className="justify-content-center mt-4">
        <div className={styles.createHeader}>Create survey</div>
      </Row>

      <Row className="justify-content-center mt-5">
        <Col lg={12} className="text-center mb-3">
          <div className={styles.deadlineHeader}>Set a deadline for completing the survey</div>
        </Col>
        <Col lg={6} className="text-center text-lg-right">
          <DayPicker selectedDays={finalDate} onDayClick={updateDate} />
        </Col>
        <Col lg={6} className="text-center text-lg-left mt-2 mt-lg-3">
          <TimePicker
            value={finalTime}
            onChange={updateTime}
            renderNumbers={true}
            clearIcon={null}
          />
        </Col>
      </Row>

      <Row className="justify-content-center mt-4">
        <Col xs={8} lg={8} className="text-left">
          <TextArea
            label="Survey Description"
            valueHandler={saveSurveyDescription}
            className={styles.surveyDescriptionInput}
          />
        </Col>
        {questions.map((id: number) => {
          return (
            <QuestionCreate
              key={id}
              id={id}
              updateQuestion={updateQuestion}
              deleteButton={
                <TiDelete
                  className={styles.removeQuestionButton}
                  onClick={() => deleteQuestion(id)}
                  key={id}
                />
              }
            />
          );
        })}
      </Row>

      <Row className="justify-content-center my-4">
        <Col xs="auto" lg={2} className="text-right mr-0 pr-0 offset-lg-7">
          <div className={styles.addQuestionButton}>
            Add question
            <PlusButton className={styles.button} onclick={createNewQuestion} />
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default CreateSurvey;
