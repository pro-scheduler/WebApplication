import MeetingNotifications from '../MeetingNotifications/MeetingNotifications';
import { UserSurvey } from '../../../model/survey/Survey';
export type MeetingSettingsProps = {
  survey: UserSurvey | undefined;
  meetingId: number;
  meetingName: string;
};
const MeetingSettings = ({ survey, meetingId, meetingName }: MeetingSettingsProps) => {
  return (
    <>
      <MeetingNotifications meetingId={meetingId} meetingName={meetingName} surveyId={survey?.id} />
    </>
  );
};
export default MeetingSettings;
