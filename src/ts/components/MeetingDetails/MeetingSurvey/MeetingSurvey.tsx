import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import styles from './MeetingSurvey.module.css';
import { AiOutlineForm } from 'react-icons/ai';
import { BsFillPieChartFill } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import MeetingSurveyQuestions from './MeetingSurveyQuestions';
import MeetingSurveyAnswers from './MeetingSurveyAnswers';
import { SurveySummary, SurveyWithQuestionsDTO, UserSurvey } from '../../../model/survey/Survey';
import MeetingSurveyDetails from './MeetingSurveyDetails';
import MeetingSurveyResults from './MeetingSurveyResults';
import { editSurvey, getSurveyToEdit } from '../../../API/survey/surveyService';
import ActionButton from '../../common/SubmitButton/ActionButton/ActionButton';
import { Question } from '../../../model/survey/Question';
import { MeetingState } from '../../../model/meeting/Meeting';

export type MeetingSurveyProps = {
  survey: UserSurvey;
  reloadSurveySummary: Function;
  surveySummary: SurveySummary | undefined;
  numberOfParticipants: number;
  isOrganizer: boolean;
  reloadSurvey: Function;
  state: MeetingState;
};
const MeetingSurvey = ({
  survey,
  reloadSurveySummary,
  surveySummary,
  numberOfParticipants,
  isOrganizer,
  reloadSurvey,
  state,
}: MeetingSurveyProps) => {
  const [showYourVotes, setShowYourVotes] = useState<boolean>(true);
  const [surveyToEdit, setSurveyToEdit] = useState<SurveyWithQuestionsDTO>({
    description: '',
    meetingId: 0,
    questions: [],
    surveyEndDate: undefined,
  });
  const [questions, setQuestions] = useState<Question[]>();
  const [editSurveyMode, setEditSurveyMode] = useState<boolean>(false);
  const [questionsToAdd, setQuestionsToAdd] = useState<Question[]>([]);

  const setSurveyToEditAndQuestions = (receivedSurvey: SurveyWithQuestionsDTO) => {
    setSurveyToEdit(receivedSurvey);
    setQuestions(receivedSurvey.questions);
  };

  useEffect(() => {
    getSurveyToEdit(survey.meetingId, setSurveyToEditAndQuestions);
  }, [survey.meetingId]);

  const refreshSurvey = () => {
    reloadSurvey();
    getSurveyToEdit(survey.meetingId, setSurveyToEdit);
  };

  const updateSurvey = () => {
    if (questionsToAdd.length > 0) {
      setQuestionsToAdd(
        questionsToAdd.map((question: Question) => {
          question.id = null;
          return question;
        })
      );

      surveyToEdit.questions = [...surveyToEdit.questions, ...questionsToAdd];
    }
    editSurvey(survey.id, surveyToEdit, () => {
      refreshSurvey();
      setEditSurveyMode(false);
    });
  };

  return (
    <Row className="justify-content">
      <Col lg={editSurveyMode ? 12 : 6}>
        <MeetingSurveyDetails
          endDate={survey.surveyEndDate}
          description={survey.description}
          editSurvey={editSurveyMode}
          surveyToEdit={surveyToEdit}
          setSurveyToEdit={setSurveyToEdit}
          state={state}
          isOrganizer={isOrganizer}
          setEditSurveyMode={() => setEditSurveyMode(!editSurveyMode)}
        />
      </Col>
      {!editSurveyMode ? (
        <>
          {surveySummary && (
            <Col lg={6}>
              <MeetingSurveyResults
                numberOfParticipants={numberOfParticipants}
                numberOfFilledSurveys={surveySummary ? surveySummary.finishedParticipantsCount : 0}
                users={surveySummary?.users ?? []}
                isOrganizer={isOrganizer}
              />
            </Col>
          )}

          <Col lg={12} className="text-center mx-auto">
            {surveySummary && (
              <div className={styles.sectionsContainer}>
                <div
                  className={`${styles.sectionIconContainer} ${showYourVotes ? styles.chosen : ''}`}
                  onClick={() => setShowYourVotes(true)}
                >
                  <AiOutlineForm />
                  <div>
                    <span className={!showYourVotes ? styles.hidden : ''}>Your votes</span>
                  </div>
                </div>
                <div
                  className={`${styles.sectionIconContainer} ${
                    !showYourVotes ? styles.chosen : ''
                  }`}
                  onClick={() => setShowYourVotes(false)}
                >
                  <BsFillPieChartFill />
                  <div>
                    <span className={showYourVotes ? styles.hidden : ''}>Voting results</span>
                  </div>
                </div>
              </div>
            )}
          </Col>

          <Col className="mt-3">
            {showYourVotes ? (
              <MeetingSurveyQuestions
                survey={survey}
                reloadSurveySummary={reloadSurveySummary}
                questionsToAdd={questionsToAdd}
                setQuestionsToAdd={setQuestionsToAdd}
                state={state}
              />
            ) : (
              surveySummary && <MeetingSurveyAnswers surveySummary={surveySummary} />
            )}
          </Col>
        </>
      ) : (
        <>
          <Col className="mt-3">
            <MeetingSurveyQuestions
              survey={survey}
              reloadSurveySummary={reloadSurveySummary}
              surveyToEdit={surveyToEdit}
              setSurveyToEdit={setSurveyToEdit}
              questionsToAdd={questionsToAdd}
              setQuestionsToAdd={setQuestionsToAdd}
              state={state}
            />
          </Col>
          <Col lg={12} className="text-center">
            <ActionButton
              onclick={updateSurvey}
              text={'Save changes'}
              disabled={
                survey.description === surveyToEdit.description &&
                survey.surveyEndDate === surveyToEdit.surveyEndDate &&
                questions === surveyToEdit.questions &&
                questionsToAdd.length === 0
              }
            />
          </Col>
        </>
      )}
    </Row>
  );
};

export default MeetingSurvey;
