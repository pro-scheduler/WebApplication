import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { ProUser } from '../../model/user/ProUser';
import MeetingList from '../../components/Meetings/MeetingList';
import { useState } from 'react';
import {
  loadUserOrganizedMeetings,
  loadUserParticipatedMeetings,
} from '../../API/user/userService';
import { Meeting } from '../../model/meeting/Meeting';
import { ApiCall } from '../../API/genericApiCalls';
import LoadingSpinner from '../../components/common/Spinner/LoadingSpinner';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CalendarIcon from '../../components/common/Icons/CalendarIcon';
import styles from './Meetings.module.css';

const Meetings = ({ user }: { user: ProUser }) => {
  const [organizedMeetings, setOrganizedMeetings] = useState<Meeting[]>([]);
  const [organizedMeetingsResponse, setOrganizedMeetingsResponse] = useState<ApiCall>(
    new ApiCall()
  );
  const [participatedMeetings, setParticipatedMeetings] = useState<Meeting[]>([]);
  const [participatedMeetingsResponse, setParticipatedMeetingsResponse] = useState<ApiCall>(
    new ApiCall()
  );

  useEffect(() => {
    loadUserOrganizedMeetings(user.id, setOrganizedMeetings, setOrganizedMeetingsResponse);
    loadUserParticipatedMeetings(user.id, setParticipatedMeetings, setParticipatedMeetingsResponse);
    // eslint-disable-next-line
  }, [user.id]);

  return (
    <Container fluid className="ml-5 ml-sm-auto">
      <Row className="justify-content-center mt-4 mb-5 mr-5" style={{ marginLeft: '6%' }}>
        <Col lg={12} className="text-center mt-5">
          <CalendarIcon className={styles.meetingListIcon} />
        </Col>
      </Row>
      {organizedMeetingsResponse.isSuccess ? (
        <MeetingList
          meetings={organizedMeetings}
          header={'Meetings you organize'}
          noMeetingsInfo={"You don't organize any meeting"}
        />
      ) : (
        <Row className="justify-content-center mt-4 mb-5 mr-5" style={{ marginLeft: '6%' }}>
          <Col className="text-center mt-5">
            <LoadingSpinner active={organizedMeetingsResponse.isLoading} />
          </Col>
        </Row>
      )}
      {participatedMeetingsResponse.isSuccess ? (
        <MeetingList
          meetings={participatedMeetings}
          header={'Meetings you participate'}
          noMeetingsInfo={"You don't participate in any meeting"}
          showRedirectButton={false}
        />
      ) : (
        <Row className="justify-content-center mt-4 mb-5 mr-5" style={{ marginLeft: '6%' }}>
          <Col className="text-center mt-5">
            <LoadingSpinner active={participatedMeetingsResponse.isLoading} />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Meetings;
