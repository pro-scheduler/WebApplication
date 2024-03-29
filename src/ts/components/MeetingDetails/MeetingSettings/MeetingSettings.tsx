import MeetingNotifications from '../MeetingNotifications/MeetingNotifications';
import { UserSurvey } from '../../../model/survey/Survey';
import { TimeRangeDTO } from '../../../model/TimeRangeDTO';
import PlaceSettings from './PlaceSettings/PlaceSettings';
import GeneralSettings from './GeneralSettings/GeneralSettings';
export type MeetingSettingsProps = {
  survey: UserSurvey | undefined;
  meetingId: number;
  meetingName: string;
  isMeetingOpen: boolean;
  showPlacesSettings: boolean;
  markTimeRangeDeadline?: string;
  meetingFinalDate?: TimeRangeDTO;
};

const MeetingSettings = ({
  survey,
  meetingId,
  meetingName,
  isMeetingOpen,
  showPlacesSettings,
  markTimeRangeDeadline,
  meetingFinalDate,
}: MeetingSettingsProps) => {
  return (
    <>
      <GeneralSettings
        meetingId={meetingId}
        meetingName={meetingName}
        isMeetingOpen={isMeetingOpen}
      />
      <MeetingNotifications
        meetingId={meetingId}
        meetingName={meetingName}
        surveyId={survey?.id}
        surveyEndDate={survey?.surveyEndDate}
        markTimeRangeDeadline={markTimeRangeDeadline}
        meetingFinalDate={meetingFinalDate}
        isMeetingOpen={isMeetingOpen}
      />
      {showPlacesSettings && <PlaceSettings meetingId={meetingId} isMeetingOpen={isMeetingOpen} />}
    </>
  );
};
export default MeetingSettings;
