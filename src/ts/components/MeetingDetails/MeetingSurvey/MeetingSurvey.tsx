import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LineWithHeader from '../LineWithHeader';
import { UserSurvey } from '../../../model/survey/Survey';
import MeetingQuestion from './MeetingQuestion';
import ActionButton from '../../common/SubmitButton/ActionButton/ActionButton';
import { useState } from 'react';
import { Question, QuestionType } from '../../../model/survey/Question';
import { Answer } from '../../../model/survey/Answer';
import surveyActions from '../../../actions/surveyActions';

const MeetingSurvey = ({ survey }: { survey: UserSurvey }) => {
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState<
    { question: Question; answer: Answer | null }[]
  >(survey.questionsAndAnswers);
  const [dataUpdated, setDataUpdated] = useState(true);
  const [buttonText, setButtonText] = useState<'INCOMPLETE' | 'COMPLETE'>(survey.state);

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
    surveyActions.fillSurvey(survey.id, questionsAndAnswers).then(() => {
      setDataUpdated(false);
      setButtonText('COMPLETE');
    });
  };

  return (
    <Row className="justify-content my-5 ml-5 pl-5">
      <Col>
        <LineWithHeader header={'Why'} />
        <div className="ml-3">
          <p>{survey.description}</p>
          {questions}
        </div>
        <div className="text-center">
          <ActionButton
            onclick={saveSurvey}
            text={buttonText === 'INCOMPLETE' ? 'Save answers' : 'Change answers'}
            disabled={!filledAnswers()}
          />
        </div>
      </Col>
    </Row>
  );
};

export default MeetingSurvey;
