import Col from 'react-bootstrap/Col';
import LineWithHeader from '../LineWithHeader';
import Row from 'react-bootstrap/Row';
import styles from './MeetingSurvey.module.css';
import SwitchButton from '../../common/SwitchButton/SwitchButton';
import { RiPencilFill } from 'react-icons/ri';
import { BsFillPieChartFill } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import MeetingSurveyQuestions from './MeetingSurveyQuestions';
import MeetingSurveyAnswers from './MeetingSurveyAnswers';
import { SurveySummary, SurveyWithQuestionsDTO, UserSurvey } from '../../../model/survey/Survey';
import MeetingSurveyDetails from './MeetingSurveyDetails';
import MeetingSurveyResults from './MeetingSurveyResults';
import { Collapse } from 'react-collapse';
import { editSurvey, getSurveyToEdit } from '../../../API/survey/surveyService';
import ActionButton from '../../common/SubmitButton/ActionButton/ActionButton';
import { Question } from '../../../model/survey/Question';

export type MeetingSurveyProps = {
  survey: UserSurvey;
  setRefreshSurveySummary: (value: number) => void;
  surveySummary: SurveySummary | undefined;
  numberOfParticipants: number;
  isOrganizer: boolean;
  setRefreshSurvey: (value: number) => void;
};
const MeetingSurvey = ({
  survey,
  setRefreshSurveySummary,
  surveySummary,
  numberOfParticipants,
  isOrganizer,
  setRefreshSurvey,
}: MeetingSurveyProps) => {
  const [displayAnswers, setDisplayAnswers] = useState<Boolean>(false);
  const [opened, setOpened] = useState<boolean>(true);
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
    editSurvey(survey.id, surveyToEdit, () => getSurveyToEdit(survey.meetingId, setSurveyToEdit));
    setRefreshSurvey(Math.random());
  };

  return (
    <Row className="justify-content my-5 ml-5 pl-5">
      <LineWithHeader
        header={'Survey'}
        iconAction={isOrganizer ? () => setEditSurveyMode(!editSurveyMode) : () => {}}
        collapseAction={setOpened}
      />
      <Col lg={editSurveyMode ? 12 : 6}>
        <Collapse isOpened={opened}>
          <MeetingSurveyDetails
            endDate={survey.surveyEndDate}
            description={survey.description}
            editSurvey={editSurveyMode}
            surveyToEdit={surveyToEdit}
            setSurveyToEdit={setSurveyToEdit}
          />
        </Collapse>
      </Col>
      {!editSurveyMode ? (
        <>
          <Col lg={6}>
            <Collapse isOpened={opened}>
              <MeetingSurveyResults
                numberOfParticipants={numberOfParticipants}
                numberOfFilledSurveys={surveySummary ? surveySummary.finishedParticipantsCount : 0}
                emails={surveySummary?.users ?? []}
              />
            </Collapse>
          </Col>

          <Col lg={12} className="text-center mx-auto">
            <Collapse isOpened={opened}>
              <div className={styles.switchTime}>
                <SwitchButton
                  onChange={() => setDisplayAnswers(!displayAnswers)}
                  checkedIcon={<BsFillPieChartFill className={styles.switchIcon} />}
                  unCheckedIcon={<RiPencilFill className={styles.switchIcon} />}
                />
              </div>
            </Collapse>
          </Col>
          <Col className="mt-3">
            <Collapse isOpened={opened}>
              {displayAnswers ? (
                <MeetingSurveyQuestions
                  survey={survey}
                  setRefreshSurveySummary={setRefreshSurveySummary}
                  questionsToAdd={questionsToAdd}
                  setQuestionsToAdd={setQuestionsToAdd}
                />
              ) : (
                surveySummary && <MeetingSurveyAnswers surveySummary={surveySummary} />
              )}
            </Collapse>
          </Col>
        </>
      ) : (
        <>
          <Col className="mt-3">
            <Collapse isOpened={opened}>
              <MeetingSurveyQuestions
                survey={survey}
                setRefreshSurveySummary={setRefreshSurveySummary}
                surveyToEdit={surveyToEdit}
                setSurveyToEdit={setSurveyToEdit}
                questionsToAdd={questionsToAdd}
                setQuestionsToAdd={setQuestionsToAdd}
              />
            </Collapse>
          </Col>
          <Col lg={12} className="text-center">
            <Collapse isOpened={opened}>
              <ActionButton
                onclick={updateSurvey}
                text={'Edit the survey'}
                disabled={
                  survey.description === surveyToEdit.description &&
                  survey.surveyEndDate === surveyToEdit.surveyEndDate &&
                  questions === surveyToEdit.questions &&
                  questionsToAdd.length === 0
                }
              />
            </Collapse>
          </Col>
        </>
      )}
    </Row>
  );
};

export default MeetingSurvey;
