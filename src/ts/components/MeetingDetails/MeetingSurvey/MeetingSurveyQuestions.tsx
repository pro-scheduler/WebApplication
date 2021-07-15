import { UserSurvey } from '../../../model/survey/Survey';
import MeetingQuestion from './MeetingQuestion';
import ActionButton from '../../common/SubmitButton/ActionButton/ActionButton';
import { useEffect, useState } from 'react';
import { Question, QuestionType } from '../../../model/survey/Question';
import { Answer } from '../../../model/survey/Answer';
import styles from './MeetingSurveyQuestions.module.css';
import { fillSurvey } from '../../../API/survey/surveyService';
import { ApiCall } from '../../../API/genericApiCalls';
import Col from 'react-bootstrap/Col';
import { BsClockFill } from 'react-icons/bs';
import Countdown from 'react-countdown';

const MeetingSurveyQuestions = ({
  survey,
  setRefreshSurveySummary,
}: {
  survey: UserSurvey;
  setRefreshSurveySummary: (value: number) => void;
}) => {
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState<
    { question: Question; answer: Answer | null }[]
  >(survey.questionsAndAnswers);
  const [dataUpdated, setDataUpdated] = useState(true);
  const [buttonText, setButtonText] = useState<'INCOMPLETE' | 'COMPLETE'>(survey.userState);
  const [saveResponse, setSaveResponse] = useState<ApiCall>(new ApiCall());

  useEffect(() => {
    if (saveResponse.isSuccess) {
      setDataUpdated(false);
      setButtonText('COMPLETE');
      setRefreshSurveySummary(Math.random());
    }
    // eslint-disable-next-line
  }, [saveResponse]);

  const setAnswer = (questionId: number | null, answer: Answer) => {
    const data = questionsAndAnswers.map((value) => {
      if (value.question.id === questionId) {
        return { question: value.question, answer: answer };
      }
      return value;
    });
    setQuestionsAndAnswers(data);
    setDataUpdated(true);
  };

  const filledAnswers = () => {
    return (
      questionsAndAnswers.filter(
        (value) =>
          value.answer !== null &&
          (value.question.type === QuestionType.OPEN
            ? value.answer.text !== ''
            : value.question.type === QuestionType.MULTI_CHOICE
            ? value.answer.choices && value.answer.choices.length > 0
            : true)
      ).length === questionsAndAnswers.length &&
      questionsAndAnswers !== survey.questionsAndAnswers &&
      dataUpdated
    );
  };

  const questions = questionsAndAnswers.map((value) => {
    return (
      <MeetingQuestion
        key={value.question.id}
        question={value.question}
        answer={value.answer}
        setAnswer={setAnswer}
      />
    );
  });

  const saveSurvey = () => {
    fillSurvey(survey.id, questionsAndAnswers, setSaveResponse);
  };

  return (
    <Col>
      <div className="mx-auto text-center mt-5">
        {survey.surveyEndDate && (
          <p className={styles.timeInfo}>
            <BsClockFill className={styles.clockIcon} />
            {survey.state === 'OPEN' ? (
              <>
                The survey will close in{' '}
                <Countdown date={survey.surveyEndDate} daysInHours={true} />
              </>
            ) : (
              'The survey is closed'
            )}
          </p>
        )}
        <p className="mt-3">{survey.description}</p>
        {questions}
      </div>
      <div className="text-center">
        {survey.state === 'OPEN' && (
          <ActionButton
            onclick={saveSurvey}
            text={buttonText === 'INCOMPLETE' ? 'Save answers' : 'Change answers'}
            disabled={!filledAnswers()}
            className={styles.saveAnswersButton}
          />
        )}
      </div>
    </Col>
  );
};

export default MeetingSurveyQuestions;
