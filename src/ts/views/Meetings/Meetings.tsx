import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import allActions from '../../actions';
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

const Meetings = () => {
  const user: ProUser = useSelector((state: RootStateOrAny) => {
    return state.userReducer;
  });
  const [invitations, setInvitations] = useState<BasicInvitationInfo[]>([]);
  const dispatch: Function = useDispatch();
  const [refreshMeetings, setRefreshMeetings] = useState<number>(0);
  const [organizedMeetings, setOrganizedMeetings] = useState<Meeting[]>([]);
  const [participatedMeetings, setParticipatedMeetings] = useState<Meeting[]>([]);

  useEffect(() => {
    dispatch(allActions.userActions.fetchCurrentUser());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    loadUserOrganizedMeetings(user.id, setOrganizedMeetings);
    loadUserParticipatedMeetings(user.id, setParticipatedMeetings);
    fetchUserPendingInvitations(user.id, setInvitations);
    // eslint-disable-next-line
  }, [user.id, refreshMeetings]);

  return (
    <Container fluid className="ml-5 ml-sm-auto">
      {invitations.length > 0 && (
        <InvitationList invitations={invitations} refreshMeetings={setRefreshMeetings} />
      )}
      <MeetingList
        meetings={organizedMeetings}
        header={'Meetings you organize'}
        noMeetingsInfo={"You don't organize any meeting"}
      />
      <MeetingList
        meetings={participatedMeetings}
        header={'Meetings you participate in'}
        noMeetingsInfo={"You don't participate in any meeting"}
      />
    </Container>
  );
};

export default Meetings;
