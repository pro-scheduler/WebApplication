import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { ProUser } from '../../model/user/ProUser';
import MeetingList from '../../components/Meetings/MeetingList';
import InvitationList from '../../components/Meetings/InvitationList';
import { useState } from 'react';
import { fetchUserPendingInvitations } from '../../API/invitation/invitationService';
import { BasicInvitationInfo } from '../../model/invitation/Invitation';
import {
  loadUserOrganizedMeetings,
  loadUserParticipatedMeetings,
} from '../../API/user/userService';
import { Meeting } from '../../model/meeting/Meeting';
import { ApiCall } from '../../API/genericApiCalls';
import LoadingSpinner from '../../components/common/Spinner/LoadingSpinner';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import userActions from '../../actions/userActions';

const Meetings = () => {
  const user: ProUser = useSelector((state: RootStateOrAny) => {
    return state.userReducer;
  });
  const [invitations, setInvitations] = useState<BasicInvitationInfo[]>([]);
  const dispatch: Function = useDispatch();
  const [refreshMeetings, setRefreshMeetings] = useState<number>(0);
  const [organizedMeetings, setOrganizedMeetings] = useState<Meeting[]>([]);
  const [organizedMeetingsResponse, setOrganizedMeetingsResponse] = useState<ApiCall>(
    new ApiCall()
  );
  const [participatedMeetings, setParticipatedMeetings] = useState<Meeting[]>([]);
  const [participatedMeetingsResponse, setParticipatedMeetingsResponse] = useState<ApiCall>(
    new ApiCall()
  );

  useEffect(() => {
    dispatch(userActions.fetchCurrentUser());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    loadUserOrganizedMeetings(user.id, setOrganizedMeetings, setOrganizedMeetingsResponse);
    loadUserParticipatedMeetings(user.id, setParticipatedMeetings, setParticipatedMeetingsResponse);
    fetchUserPendingInvitations(user.id, setInvitations);
    // eslint-disable-next-line
  }, [user.id, refreshMeetings]);

  return (
    <Container fluid className="ml-5 ml-sm-auto">
      {invitations.length > 0 && (
        <InvitationList invitations={invitations} refreshMeetings={setRefreshMeetings} />
      )}
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
          header={'Meetings you participate in'}
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
