import { SurveyWithQuestionsDTO, UserSurvey } from '../../../model/survey/Survey';
import MeetingQuestion from './MeetingQuestion';
import ActionButton from '../../common/SubmitButton/ActionButton/ActionButton';
import { useEffect, useState } from 'react';
import { Question, QuestionType } from '../../../model/survey/Question';
import { Answer } from '../../../model/survey/Answer';
import styles from './MeetingSurveyQuestions.module.css';
import { fillSurvey } from '../../../API/survey/surveyService';
import { ApiCall } from '../../../API/genericApiCalls';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import QuestionCreate from '../../CreateSurvey/QuestionCreate';
import PlusButton from '../../common/RoundButtons/PlusButton';

const MeetingSurveyQuestions = ({
  survey,
  setRefreshSurveySummary,
  surveyToEdit,
  setSurveyToEdit,
  questionsToAdd,
  setQuestionsToAdd,
}: {
  survey: UserSurvey;
  setRefreshSurveySummary: (value: number) => void;
  surveyToEdit?: SurveyWithQuestionsDTO;
  setSurveyToEdit?: (editedSurvey: SurveyWithQuestionsDTO) => void;
  questionsToAdd: Question[];
  setQuestionsToAdd: (newQuestions: Question[]) => void;
}) => {
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState<
    { question: Question; answer: Answer | null }[]
  >(survey.questionsAndAnswers);
  const [dataUpdated, setDataUpdated] = useState(true);
  const [buttonText, setButtonText] = useState<'INCOMPLETE' | 'COMPLETE'>(survey.userState);
  const [saveResponse, setSaveResponse] = useState<ApiCall>(new ApiCall());
  const [newQuestions, setNewQuestions] = useState<number[]>([]);
  const [questionId, setQuestionId] = useState(0);

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

  const deleteQuestion = (questionId: number | null) => {
    if (surveyToEdit && setSurveyToEdit) {
      const editedQuestions: Question[] = surveyToEdit.questions.filter(
        (question: Question) => question.id !== questionId
      );
      setSurveyToEdit({ ...surveyToEdit, questions: editedQuestions });

      setQuestionsAndAnswers(
        questionsAndAnswers.filter((value) => value.question.id !== questionId)
      );
    }
  };

  const createNewQuestion = () => {
    setNewQuestions([...newQuestions, questionId]);
    setQuestionId(questionId + 1);
  };

  const updateNewQuestion = (questionToUpdate: Question) => {
    const updatedQuestions = questionsToAdd.filter(
      (question: Question) => question.id !== questionToUpdate.id
    );
    setQuestionsToAdd([...updatedQuestions, questionToUpdate]);
  };

  const deleteNewQuestion = (idToDelete: number) => {
    setQuestionsToAdd(questionsToAdd.filter((question: Question) => question.id !== idToDelete));
    setNewQuestions(newQuestions.filter((id: number) => idToDelete !== id));
  };

  const questions = questionsAndAnswers.map((value, index: number) => {
    return (
      <MeetingQuestion
        key={value.question.id}
        question={value.question}
        answer={value.answer}
        setAnswer={setAnswer}
        questionNumber={index + 1}
        onDelete={surveyToEdit ? () => deleteQuestion(value.question.id) : undefined}
      />
    );
  });

  const saveSurvey = () => {
    fillSurvey(survey.id, questionsAndAnswers, setSaveResponse);
  };

  return (
    <>
      <div>{questions}</div>
      {survey.state === 'OPEN' && !surveyToEdit && (
        <div className="text-center mt-5">
          <ActionButton
            onclick={saveSurvey}
            text={buttonText === 'INCOMPLETE' ? 'Save my answers' : 'Change my answers'}
            disabled={!filledAnswers()}
            className={styles.saveAnswersButton}
          />
        </div>
      )}
      {surveyToEdit && (
        <div className="mt-0">
          {newQuestions.map((id: number, index: number) => {
            return (
              <QuestionCreate
                questionNumber={
                  surveyToEdit ? surveyToEdit.questions.length + index + 1 : index + 1
                }
                id={id}
                updateQuestion={updateNewQuestion}
                onDelete={() => deleteNewQuestion(id)}
              />
            );
          })}

          <Row className="justify-content-center my-4">
            <Col xs="auto" lg={2} className="text-right mr-0 pr-0 offset-lg-8">
              <div className={styles.addQuestionButton}>
                Add question
                <PlusButton className={styles.button} onclick={createNewQuestion} />
              </div>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default MeetingSurveyQuestions;
