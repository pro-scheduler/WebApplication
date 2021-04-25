import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Container from 'react-bootstrap/Container';
import Meeting from '../../model/Meeting';
import MeetingDescription from '../../components/MeetingDetails/MeetingDescription';
import { fetchMeetingWithId } from '../../API/meeting/methods';
import MeetingParticipants from '../../components/MeetingDetails/MeetingParticipants';

const initialMeeting: Meeting = {
  name: '',
  description: '',
  id: 0,
  availableTimeRanges: [],
  attendees: [],
  organizers: [],
};

const MeetingDetails = () => {
  const { id }: any = useParams();
  const [meeting, setMeeting] = useState(initialMeeting);

  useEffect(() => {
    fetchMeetingWithId(id).then((meeting: Meeting) => setMeeting(meeting));
    // eslint-disable-next-line
  }, []);

  return (
    <Container fluid className="ml-5 ml-sm-auto">
      <MeetingDescription
        name={meeting.name}
        description={meeting.description}
        organizersId={meeting.organizers}
      />
      <MeetingParticipants participants={meeting.attendees} />
    </Container>
  );
};

export default MeetingDetails;
