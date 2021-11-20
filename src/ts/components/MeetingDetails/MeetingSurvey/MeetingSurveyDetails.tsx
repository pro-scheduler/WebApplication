import Card from '../../common/Card/Card';
import styles from './MeetingSurveyDetails.module.css';
import Timer from '../../common/Timer/Timer';
import DateTimePicker from '../../common/forms/DateTimePicker/DateTimePicker';
import TextArea from '../../common/forms/TextArea/TextArea';
import { SurveyWithQuestionsDTO } from '../../../model/survey/Survey';
import { MeetingState } from '../../../model/meeting/Meeting';

export type MeetingSurveyDetailsProps = {
  endDate: string | undefined;
  description?: string;
  editSurvey: boolean;
  surveyToEdit: SurveyWithQuestionsDTO;
  setSurveyToEdit: (editedSurvey: SurveyWithQuestionsDTO) => void;
  state: MeetingState;
  isOrganizer: boolean;
  setEditSurveyMode: Function;
};

const MeetingSurveyDetails = ({
  endDate,
  description,
  editSurvey,
  surveyToEdit,
  setSurveyToEdit,
  state,
  isOrganizer,
  setEditSurveyMode,
}: MeetingSurveyDetailsProps) => {
  const setEndDate = (newDate: Date) => {
    if (surveyToEdit) setSurveyToEdit({ ...surveyToEdit, surveyEndDate: newDate });
  };

  const setDescription = (newDescription: string) => {
    if (surveyToEdit) setSurveyToEdit({ ...surveyToEdit, description: newDescription });
  };

  return (
    <Card title={'Details'} onEdit={isOrganizer ? setEditSurveyMode : undefined}>
      <div className={styles.container}>
        {!editSurvey ? (
          <>
            {state === MeetingState.OPEN ? (
              <Timer
                date={endDate}
                completedMessage={'The survey is closed'}
                nonCompletedMessage={'The survey ends in:'}
                noEndDateMessage={'The survey has no time limit'}
              />
            ) : (
              <p>The survey is canceled</p>
            )}
            {description && (
              <>
                <p className={styles.descriptionHeader}>Description</p>
                {description}
              </>
            )}
          </>
        ) : (
          <>
            <p className={styles.deadlineHeader}>Deadline for completing the survey</p>
            <DateTimePicker
              setDate={setEndDate}
              timeLabel="Select day"
              dateLabel="Select time"
              defaultDate={surveyToEdit.surveyEndDate ? surveyToEdit.surveyEndDate : null}
            />
            <p className={styles.descriptionHeader}>Description</p>
            <TextArea
              valueHandler={setDescription}
              placeholder="Please type survey description ..."
              defaultValue={description}
            />
          </>
        )}
      </div>
    </Card>
  );
};
export default MeetingSurveyDetails;
