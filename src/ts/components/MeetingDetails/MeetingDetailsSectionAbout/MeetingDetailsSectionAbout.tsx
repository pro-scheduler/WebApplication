import { useEffect, useState } from 'react';
import styles from './MeetingDetailsSectionAbout.module.css';
import {
  MeetingAttendeeDetails,
  MeetingDetails,
  MeetingRole,
  MeetingSettings as MeetingGeneralSettings,
  OnlineMeetingDetails,
} from '../../../model/meeting/Meeting';
import { Col, Row } from 'react-bootstrap';
import MeetingDescription from '../MeetingDescription';
import MeetingDetailsInfo from '../MeetingDetailsInfo';
import MeetingParticipants from '../MeetingParticipants/MeetingParticipants';
import MeetingAboutInfo from './MeetingAboutInfo/MeetingAboutInfo';

export type MeetingDetailsSectionAboutProps = {
  meeting: MeetingDetails;
  isOrganizer: boolean;
  meetingSettings: MeetingGeneralSettings;
  onMeetingChange: Function;
};

const MeetingDetailsSectionAbout = ({
  meeting,
  isOrganizer,
  meetingSettings,
  onMeetingChange,
}: MeetingDetailsSectionAboutProps) => {
  const [meetingName, setMeetingName] = useState<string>(meeting.name);
  const [meetingDescription, setMeetingDescription] = useState<string>(meeting.description);
  const setMeetingNameAndDescription = (name: string, description: string) => {
    setMeetingName(name);
    setMeetingDescription(description);
    onMeetingChange();
  };

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
      <Row className="justify-content">
        <Col lg={6}>
          <MeetingDetailsInfo
            hasSurvey={/*survey !== undefined*/ true} //TODO: fix it
            meetingLink={(meeting as OnlineMeetingDetails)?.link}
            meetingPassword={(meeting as OnlineMeetingDetails)?.password}
            finalPlace={undefined} // TODO replace by final place
            name={meetingName}
            description={meetingDescription}
            isOrganizer={isOrganizer}
            meetingId={meeting.id}
            state={meeting.state}
            refreshMeeting={onMeetingChange}
            refreshNameAndDescription={setMeetingNameAndDescription}
            finalEndDate={meeting.finalDate ? new Date(meeting.finalDate.timeEnd) : null}
            finalBeginDate={meeting.finalDate ? new Date(meeting.finalDate.timeStart) : null}
            declarationsNumber={0}
            showGoogleCalendar={meeting.finalDate !== null}
          />
        </Col>
        <Col lg={6}>
          <MeetingParticipants
            meetingId={meeting.id}
            isOrganizer={isOrganizer}
            refreshParticipants={onMeetingChange}
            participants={meeting.attendees}
            state={meeting.state}
            everybodyCanInvite={!meetingSettings.onlyOrganizerCanInviteNewPeople}
          />
        </Col>
      </Row>
    </>
  );
};

export default MeetingDetailsSectionAbout;
