import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { SharedMeetingSummary } from '../../model/meeting/Meeting';
import {
  getMeetingByGeneratedEndpoint,
  joinMeetingByGeneratedEndpoint,
} from '../../API/meeting/meetingService';
import LandingPageNavbar from '../../components/LandingPage/LandingPageNavbar/LandingPageNavbar';
import { UserSummary } from '../../model/user/ProUser';
import styles from './MeetingInvitation.module.css';
import { ApiCall } from '../../API/genericApiCalls';
import LoadingSpinner from '../../components/common/Spinner/LoadingSpinner';
import ActionButton from '../../components/common/SubmitButton/ActionButton/ActionButton';
import { useHistory } from 'react-router-dom';
import { defaultUser } from '../../auth/userContext';
import { fetchCurrentUser } from '../../API/user/userService';

const MeetingInvitation = () => {
  const { generatedEndpoint }: any = useParams();

  const [user, setUser] = useState<UserSummary>(defaultUser);
  const [userResponse, setUserResponse] = useState<any>({ isFailed: false });

  const [meeting, setMeeting] = useState<SharedMeetingSummary>();
  const [meetingStartDate, setMeetingStartDate] = useState<Date | undefined>();
  const [meetingEndDate, setMeetingEndDate] = useState<Date | undefined>();
  const [response, setResponse] = useState<ApiCall>(new ApiCall());
  const history = useHistory();

  useEffect(() => {
    fetchCurrentUser(setUser, setUserResponse);
  }, []);

  useEffect(() => {
    getMeetingByGeneratedEndpoint(generatedEndpoint, setMeeting, setResponse);
  }, [generatedEndpoint]);

  useEffect(() => {
    if (meeting && meeting.finalDate) {
      setMeetingStartDate(new Date(meeting.finalDate.timeStart));
      setMeetingEndDate(new Date(meeting.finalDate.timeEnd));
    }
  }, [meeting]);

  const joinMeeting = () => {
    joinMeetingByGeneratedEndpoint(generatedEndpoint, () =>
      history.push('/meetings/' + meeting?.id)
    );
  };

  return (
    <Container fluid>
      <LandingPageNavbar user={user} showUserIcon={true} />
      {response.isSuccess && meeting ? (
        <Row className="justify-content-center my-5 pt-5">
          <Col lg={12} className="mt-5">
            <div className={styles.invitationHeaderContainer}>
              <div className={styles.meetingDetails}>{meeting.invitedBy.email}</div>
              <div>invited you to the</div>
              <div className={styles.meetingDetails}>{meeting.name}</div>
              <div>meeting</div>
            </div>
          </Col>
          {meeting.description && (
            <Col lg={12} className="text-center mt-3">
              <div>{meeting.description}</div>
            </Col>
          )}
          {meetingStartDate && meetingEndDate && (
            <Col lg={12} className="text-center mt-3">
              <div className={styles.greyFont}>
                {meetingStartDate.toLocaleString('en-US', {
                  hour: 'numeric',
                  hour12: true,
                  minute: 'numeric',
                })}{' '}
                -{' '}
                {meetingEndDate.toLocaleString('en-US', {
                  hour: 'numeric',
                  hour12: true,
                  minute: 'numeric',
                })}
              </div>
              <div className={styles.greyFont}>
                {meetingStartDate.toLocaleDateString() === meetingEndDate.toLocaleDateString()
                  ? meetingStartDate.toLocaleDateString()
                  : meetingStartDate.toLocaleDateString() +
                    ' - ' +
                    meetingEndDate.toLocaleDateString()}
              </div>
            </Col>
          )}
          <Col lg={12} className="text-center mt-5">
            <ActionButton
              onclick={joinMeeting}
              text={'Join'}
              disabled={
                userResponse.isFailed ||
                meeting.organizers.find((organizer: UserSummary) => organizer.id === user.id)
              }
              className={styles.joinButton}
            />
            {userResponse.isFailed && (
              <div className={styles.signInInfo}>Please, sign in first</div>
            )}
          </Col>
        </Row>
      ) : (
        <Row className="justify-content-center mt-4 mb-5">
          <Col className="text-center mt-5">
            <LoadingSpinner active={response.isLoading} />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default MeetingInvitation;
