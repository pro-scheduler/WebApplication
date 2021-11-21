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
import { MeetingState } from '../../../model/meeting/Meeting';

const MeetingSurveyQuestions = ({
  survey,
  reloadSurveySummary,
  surveyToEdit,
  setSurveyToEdit,
  questionsToAdd,
  setQuestionsToAdd,
  state,
}: {
  survey: UserSurvey;
  reloadSurveySummary: Function;
  surveyToEdit?: SurveyWithQuestionsDTO;
  setSurveyToEdit?: (editedSurvey: SurveyWithQuestionsDTO) => void;
  questionsToAdd: Question[];
  setQuestionsToAdd: (newQuestions: Question[]) => void;
  state: MeetingState;
}) => {
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState<
    { question: Question; answer: Answer | null }[]
  >(survey.questionsAndAnswers);
  const [dataUpdated, setDataUpdated] = useState(true);
  const [saveResponse, setSaveResponse] = useState<ApiCall>(new ApiCall());
  const [newQuestions, setNewQuestions] = useState<number[]>([]);
  const [questionId, setQuestionId] = useState(0);

  useEffect(() => {
    if (saveResponse.isSuccess) {
      setDataUpdated(false);
      reloadSurveySummary();
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

  const questions = questionsAndAnswers
    .filter(
      (value: { answer: Answer | null; question: Question }) =>
        value !== null && value.question !== null
    )
    .sort(
      (
        a: { answer: Answer | null; question: Question },
        b: { answer: Answer | null; question: Question }
      ) =>
        a.question.id !== null && b.question.id != null && a.question.id > b.question.id ? 1 : -1
    )
    .map((value, index: number) => {
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
      {survey.state === 'OPEN' && !surveyToEdit && state === MeetingState.OPEN && (
        <div className="text-center mt-5">
          <ActionButton
            onclick={saveSurvey}
            text={'Save my answers'}
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
