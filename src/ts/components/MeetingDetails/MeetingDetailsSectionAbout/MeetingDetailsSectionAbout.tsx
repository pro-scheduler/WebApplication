import {
  MeetingDetails,
  MeetingModuleType,
  MeetingSettings as MeetingGeneralSettings,
  OnlineMeetingDetails,
  RealMeetingDetails,
} from '../../../model/meeting/Meeting';
import { Col, Row } from 'react-bootstrap';
import MeetingDetailsInfo from '../MeetingDetailsInfo/MeetingDetailsInfo';
import MeetingParticipants from '../MeetingParticipants/MeetingParticipants';
import MeetingAboutInfo from './MeetingAboutInfo/MeetingAboutInfo';

export type MeetingDetailsSectionAboutProps = {
  meeting: MeetingDetails;
  isOrganizer: boolean;
  meetingSettings: MeetingGeneralSettings;
  onMeetingChange: Function;
  currentUserId: number;
};

const MeetingDetailsSectionAbout = ({
  meeting,
  isOrganizer,
  meetingSettings,
  onMeetingChange,
  currentUserId,
}: MeetingDetailsSectionAboutProps) => {
  return (
    <>
      <Row className="justify-content">
        <Col lg={12}>
          <MeetingAboutInfo
            meeting={meeting}
            isOrganizer={isOrganizer}
            onMeetingChange={onMeetingChange}
            showGoogleCalendar={meeting.finalDate !== null}
          />
        </Col>
      </Row>
      <Row className="justify-content mb-5">
        <Col lg={6}>
          <MeetingDetailsInfo
            surveyModule={meeting.availableModules.includes(MeetingModuleType.SURVEY)}
            palceVotingModule={meeting.availableModules.includes(MeetingModuleType.PLACE_VOTING)}
            timeVotingModule={meeting.availableModules.includes(MeetingModuleType.TIME_VOTING)}
            meetingLink={(meeting as OnlineMeetingDetails)?.link}
            meetingPassword={(meeting as OnlineMeetingDetails)?.password}
            finalPlace={(meeting as RealMeetingDetails)?.finalPlace}
            isOrganizer={isOrganizer}
            meetingId={meeting.id}
            state={meeting.state}
            refreshMeeting={onMeetingChange}
            finalEndDate={meeting.finalDate ? new Date(meeting.finalDate.timeEnd) : null}
            finalBeginDate={meeting.finalDate ? new Date(meeting.finalDate.timeStart) : null}
            declarationsModule={meeting.availableModules.includes(MeetingModuleType.DECLARATIONS)}
            meetingType={meeting.type}
            markTimeRangeDeadline={
              meeting.markTimeRangeDeadline ? new Date(meeting.markTimeRangeDeadline) : null
            }
            meetingName={meeting.name}
          />
        </Col>
        <Col lg={6}>
          <MeetingParticipants
            meetingId={meeting.id}
            isOrganizer={isOrganizer}
            refreshParticipants={onMeetingChange}
            participants={meeting.attendees}
            state={meeting.state}
            everybodyCanInvite={meetingSettings.participantsCanInvitePeople}
            currentUserId={currentUserId}
          />
        </Col>
      </Row>
    </>
  );
};

export default MeetingDetailsSectionAbout;
