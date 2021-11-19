import MeetingNotifications from '../MeetingNotifications/MeetingNotifications';
import { UserSurvey } from '../../../model/survey/Survey';
import { TimeRangeDTO } from '../../../model/TimeRangeDTO';
import PlaceSettings from './PlaceSettings/PlaceSettings';
import GeneralSettings from './GeneralSettings/GeneralSettings';
export type MeetingSettingsProps = {
  survey: UserSurvey | undefined;
  meetingId: number;
  meetingName: string;
  showPlacesSettings: boolean;
  markTimeRangeDeadline?: string;
  meetingFinalDate?: TimeRangeDTO;
};

const MeetingSettings = ({
  survey,
  meetingId,
  meetingName,
  showPlacesSettings,
  markTimeRangeDeadline,
  meetingFinalDate,
}: MeetingSettingsProps) => {
  return (
    <>
      <GeneralSettings meetingId={meetingId} meetingName={meetingName} />
      <MeetingNotifications
        meetingId={meetingId}
        meetingName={meetingName}
        surveyId={survey?.id}
        surveyEndDate={survey?.surveyEndDate}
        markTimeRangeDeadline={markTimeRangeDeadline}
        meetingFinalDate={meetingFinalDate}
      />
      {showPlacesSettings && <PlaceSettings meetingId={meetingId} />}
    </>
  );
};
export default MeetingSettings;
