import {
  MeetingDetails,
  MeetingModuleType,
  MeetingSettings as MeetingGeneralSettings,
  OnlineMeetingDetails,
  RealMeetingDetails,
} from '../../../model/meeting/Meeting';
import { Col, Row } from 'react-bootstrap';
import MeetingDetailsInfo from '../MeetingDetailsInfo';
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
          />
        </Col>
      </Row>
      <Row className="justify-content mb-5">
        <Col lg={6}>
          <MeetingDetailsInfo
            surveyModule={meeting.availableModules.includes(MeetingModuleType.SURVEY)}
            meetingLink={(meeting as OnlineMeetingDetails)?.link}
            meetingPassword={(meeting as OnlineMeetingDetails)?.password}
            finalPlace={(meeting as RealMeetingDetails)?.finalPlace?.name}
            isOrganizer={isOrganizer}
            meetingId={meeting.id}
            state={meeting.state}
            refreshMeeting={onMeetingChange}
            finalEndDate={meeting.finalDate ? new Date(meeting.finalDate.timeEnd) : null}
            finalBeginDate={meeting.finalDate ? new Date(meeting.finalDate.timeStart) : null}
            declarationsModule={meeting.availableModules.includes(MeetingModuleType.DECLARATIONS)}
            showGoogleCalendar={meeting.finalDate !== null}
            meetingType={meeting.type}
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
