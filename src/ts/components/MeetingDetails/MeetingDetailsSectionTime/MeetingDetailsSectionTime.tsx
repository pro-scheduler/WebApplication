import { useEffect, useState } from 'react';
import styles from './MeetingDetailsSectionTime.module.css';
import { MeetingAttendeeDetails } from '../../../model/meeting/Meeting';
import { Col, Row } from 'react-bootstrap';
import MeetingTime from '../MeetingTime/MeetingTime';
import { UserSummary } from '../../../model/user/ProUser';
import { TimeRangeDTO } from '../../../model/TimeRangeDTO';
import { MeetingChangeFunction } from '../../../views/MeetingDetails/MeetingDetails';

export type MeetingDetailsSectionTimeProps = {
  meeting: any;
  isOrganizer: boolean;
  user: UserSummary;
  onMeetingChange: MeetingChangeFunction;
};

const MeetingDetailsSectionTime = ({
  meeting,
  isOrganizer,
  user,
  onMeetingChange,
}: MeetingDetailsSectionTimeProps) => {
  const [userAttendeeId, setUserAttendeeId] = useState<number>(0);
  const [allUsersAnswers, setAllUsersAnswers] = useState<TimeRangeDTO[]>([]);
  const [userTimeAnswers, setUserTimeAnswers] = useState<TimeRangeDTO[]>([]);
  const [markTimeRangeDeadline, setMarkTimeRangeDeadline] = useState(meeting.markTimeRangeDeadline);

  const setUser = (attendeeDetails: MeetingAttendeeDetails) => {
    const currentUser = meeting.attendees.find(
      (a: MeetingAttendeeDetails) => a.attendeeId === attendeeDetails.attendeeId
    );
    onMeetingChange({
      ...meeting,
      attendees: currentUser
        ? [
            ...meeting.attendees.filter(
              (a: MeetingAttendeeDetails) => a.attendeeId !== attendeeDetails.attendeeId
            ),
            {
              ...currentUser,
              markedTimeRanges: attendeeDetails.markedTimeRanges,
            },
          ]
        : [...meeting.attendees],
    });
  };

  useEffect(() => {
    if (meeting && user.id) {
      setUserAttendeeId(meeting.attendees.find((a: any) => a.user.id === user.id)?.attendeeId);
    }
    // eslint-disable-next-line
  }, [meeting, user.id]);

  useEffect(() => {
    if (meeting && meeting.availableTimeRanges && user.id) {
      setAllUsersAnswers(
        meeting.attendees.flatMap((a: MeetingAttendeeDetails) => a.markedTimeRanges)
      );
      setUserTimeAnswers(
        meeting.attendees.find((a: any) => a.user.id === user.id)?.markedTimeRanges
      );
    }
    // eslint-disable-next-line
  }, [meeting]);

  return (
    <Row className="justify-content mb-5">
      <Col lg={12}>
        <MeetingTime
          meetingId={meeting.id}
          attendeeId={userAttendeeId}
          timeRanges={meeting.availableTimeRanges}
          answers={allUsersAnswers}
          userRanges={userTimeAnswers}
          setUser={setUser}
          timeDeadline={markTimeRangeDeadline}
          numberOfParticipants={meeting.attendees.length}
          isOrganizer={isOrganizer}
          state={meeting.state}
          setNewDeadline={setMarkTimeRangeDeadline}
        />
      </Col>
    </Row>
  );
};

export default MeetingDetailsSectionTime;
