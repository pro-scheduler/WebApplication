import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { UserSummary } from '../../model/user/ProUser';
import MeetingList from '../../components/Meetings/MeetingList';
import { MeetingState, MeetingSummary } from '../../model/meeting/Meeting';
import { ApiCall } from '../../API/genericApiCalls';
import LoadingSpinner from '../../components/common/Spinner/LoadingSpinner';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { fetchAllMeetings } from '../../API/meeting/meetingService';

const Meetings = ({ user }: { user: UserSummary }) => {
  const [organizedMeetings, setOrganizedMeetings] = useState<MeetingSummary[]>([]);
  const [participatedMeetings, setParticipatedMeetings] = useState<MeetingSummary[]>([]);
  const [pastMeetings, setPastMeetings] = useState<MeetingSummary[]>([]);

  const [meetingsResponse, setMeetingsResponse] = useState<ApiCall>(new ApiCall());

  const setUserMeetings = (meetings: MeetingSummary[]) => {
    setPastMeetings(
      meetings.filter(
        (meeting: MeetingSummary) =>
          (meeting.finalDate && new Date(meeting.finalDate.timeEnd) < new Date()) ||
          meeting.state === MeetingState.CANCELLED
      )
    );
    setOrganizedMeetings(
      meetings.filter(
        (meeting: MeetingSummary) =>
          meeting.organizers.find((organizer: UserSummary) => organizer.id === user.id) &&
          (!meeting.finalDate || new Date(meeting.finalDate.timeEnd) >= new Date()) &&
          meeting.state !== MeetingState.CANCELLED
      )
    );
    setParticipatedMeetings(
      meetings.filter(
        (meeting: MeetingSummary) =>
          meeting.organizers.find((organizer: UserSummary) => organizer.id !== user.id) &&
          (!meeting.finalDate || new Date(meeting.finalDate.timeEnd) >= new Date()) &&
          meeting.state !== MeetingState.CANCELLED
      )
    );
  };

  const refreshMeetings = () => {
    fetchAllMeetings(setUserMeetings, setMeetingsResponse);
  };

  useEffect(() => {
    refreshMeetings();
    // eslint-disable-next-line
  }, [user.id]);

  return (
    <Container fluid>
      {meetingsResponse.isSuccess ? (
        <Row className="justify-content-center mt-4">
          <Col lg={12}>
            <MeetingList
              meetings={organizedMeetings}
              header={'Meetings you organize'}
              noMeetingsInfo={"You don't organize any meetings"}
            />
          </Col>
          <Col lg={12}>
            <MeetingList
              meetings={participatedMeetings}
              header={'Meetings you participate'}
              noMeetingsInfo={"You don't participate in any meetings"}
              showRedirectButton={false}
            />
          </Col>
          <Col lg={12}>
            <MeetingList
              meetings={pastMeetings}
              header={'Past meetings'}
              noMeetingsInfo={"You don't have any past meetings"}
              showRedirectButton={false}
              refreshMeetings={refreshMeetings}
            />
          </Col>
        </Row>
      ) : (
        <Row className="justify-content-center mt-4 mb-5">
          <Col className="text-center mt-5">
            <LoadingSpinner active={meetingsResponse.isLoading} />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Meetings;
