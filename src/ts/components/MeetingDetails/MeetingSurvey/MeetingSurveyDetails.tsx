import Card from '../../common/Card/Card';
import styles from './MeetingSurveyDetails.module.css';
import Timer from '../../common/Timer/Timer';

export type MeetingSurveyDetailsProps = {
  endDate: string | undefined;
  description?: string;
};

const MeetingSurveyDetails = ({ endDate, description }: MeetingSurveyDetailsProps) => {
  return (
    <Card title={'Details'}>
      <div className={styles.container}>
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
      </div>
    </Card>
  );
};
export default MeetingSurveyDetails;
