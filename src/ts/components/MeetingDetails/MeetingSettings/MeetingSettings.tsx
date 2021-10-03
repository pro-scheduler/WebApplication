import MeetingNotifications from '../MeetingNotifications/MeetingNotifications';
import { UserSurvey } from '../../../model/survey/Survey';
import { TimeRangeDTO } from '../../../model/TimeRangeDTO';
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
    <MeetingNotifications
      meetingId={meetingId}
      meetingName={meetingName}
      surveyId={survey?.id}
      surveyEndDate={survey?.surveyEndDate}
      markTimeRangeDeadline={markTimeRangeDeadline}
      meetingFinalDate={meetingFinalDate}
    />
  );
};
export default MeetingSettings;
