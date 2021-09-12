import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { UserSummary } from '../../model/user/ProUser';
import MeetingList from '../../components/Meetings/MeetingList';
import { useState } from 'react';
import { MeetingSummary } from '../../model/meeting/Meeting';
import { ApiCall } from '../../API/genericApiCalls';
import LoadingSpinner from '../../components/common/Spinner/LoadingSpinner';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CalendarIcon from '../../components/common/Icons/CalendarIcon';
import styles from './Meetings.module.css';
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
          meeting.finalDate && new Date(meeting.finalDate.timeEnd) < new Date()
      )
    );
    setOrganizedMeetings(
      meetings.filter(
        (meeting: MeetingSummary) =>
          meeting.organizer.id === user.id &&
          (!meeting.finalDate || new Date(meeting.finalDate.timeEnd) >= new Date())
      )
    );
    setParticipatedMeetings(
      meetings.filter(
        (meeting: MeetingSummary) =>
          meeting.organizer.id !== user.id &&
          (!meeting.finalDate || new Date(meeting.finalDate.timeEnd) >= new Date())
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
    <Container fluid className="ml-5 ml-sm-auto">
      <Row className="justify-content-center mt-4 mb-5 mr-5" style={{ marginLeft: '6%' }}>
        <Col lg={12} className="text-center mt-5">
          <CalendarIcon className={styles.meetingListIcon} />
        </Col>
      </Row>
      {meetingsResponse.isSuccess ? (
        <>
          <MeetingList
            meetings={organizedMeetings}
            header={'Meetings you organize'}
            noMeetingsInfo={"You don't organize any meeting"}
          />
          <MeetingList
            meetings={participatedMeetings}
            header={'Meetings you participate'}
            noMeetingsInfo={"You don't participate in any meeting"}
            showRedirectButton={false}
          />
          <MeetingList
            meetings={pastMeetings}
            header={'Past meetings'}
            noMeetingsInfo={"You don't have any past meetings"}
            showRedirectButton={false}
            refreshMeetings={refreshMeetings}
          />
        </>
      ) : (
        <Row className="justify-content-center mt-4 mb-5 mr-5" style={{ marginLeft: '6%' }}>
          <Col className="text-center mt-5">
            <LoadingSpinner active={meetingsResponse.isLoading} />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Meetings;
