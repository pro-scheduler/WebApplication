import Card from '../../common/Card/Card';
import styles from './MeetingSurveyDetails.module.css';
import Timer from '../../common/Timer/Timer';
import DateTimePicker from '../../common/forms/DateTimePicker/DateTimePicker';
import TextArea from '../../common/forms/TextArea/TextArea';
import { SurveyWithQuestionsDTO } from '../../../model/survey/Survey';

export type MeetingSurveyDetailsProps = {
  endDate: string | undefined;
  description?: string;
  editSurvey: boolean;
  surveyToEdit: SurveyWithQuestionsDTO;
  setSurveyToEdit: (editedSurvey: SurveyWithQuestionsDTO) => void;
};

const MeetingSurveyDetails = ({
  endDate,
  description,
  editSurvey,
  surveyToEdit,
  setSurveyToEdit,
}: MeetingSurveyDetailsProps) => {
  const setEndDate = (newDate: Date) => {
    if (surveyToEdit) setSurveyToEdit({ ...surveyToEdit, surveyEndDate: newDate });
  };

  const setDescription = (newDescription: string) => {
    if (surveyToEdit) setSurveyToEdit({ ...surveyToEdit, description: newDescription });
  };

  return (
    <Card title={'Details'}>
      <div className={styles.container}>
        {!editSurvey ? (
          <>
            <Timer
              date={endDate}
              completedMessage={'The survey is closed'}
              nonCompletedMessage={'The survey ends in:'}
              noEndDateMessage={'The survey has no time limit'}
            />
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
              defaultDate={surveyToEdit.surveyEndDate ? surveyToEdit.surveyEndDate : new Date()}
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
