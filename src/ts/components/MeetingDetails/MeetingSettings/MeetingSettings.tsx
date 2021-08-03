import MeetingNotifications from '../MeetingNotifications/MeetingNotifications';
import { UserSurvey } from '../../../model/survey/Survey';
export type MeetingSettingsProps = {
  survey: UserSurvey | undefined;
};
const MeetingSettings = ({ survey }: MeetingSettingsProps) => {
  return (
    <>
      <MeetingNotifications showSurveyNotifications={survey !== undefined} />
    </>
  );
};
export default MeetingSettings;
