import MeetingNotifications from '../MeetingNotifications/MeetingNotifications';
import { UserSurvey } from '../../../model/survey/Survey';
import { TimeRangeDTO } from '../../../model/TimeRangeDTO';
import PlaceSettings from './PlaceSettings/PlaceSettings';
export type MeetingSettingsProps = {
  survey: UserSurvey | undefined;
  meetingId: number;
  meetingName: string;
  markTimeRangeDeadline?: string;
  meetingFinalDate?: TimeRangeDTO;
};

const MeetingSettings = ({
  survey,
  meetingId,
  meetingName,
  markTimeRangeDeadline,
  meetingFinalDate,
}: MeetingSettingsProps) => {
  return (
    <>
      <MeetingNotifications
        meetingId={meetingId}
        meetingName={meetingName}
        surveyId={survey?.id}
        surveyEndDate={survey?.surveyEndDate}
        markTimeRangeDeadline={markTimeRangeDeadline}
        meetingFinalDate={meetingFinalDate}
      />
      <PlaceSettings meetingId={meetingId} />
    </>
  );
};
export default MeetingSettings;
