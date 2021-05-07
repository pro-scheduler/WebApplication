import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import allActions from '../../actions';
import ProUser from '../../model/user/ProUser';
import MeetingList from '../../components/Meetings/MeetingList';
import InvitationList from '../../components/Meetings/InvitationList';

const Meetings = () => {
  const user: ProUser = useSelector((state: RootStateOrAny) => {
    return state.userReducer;
  });
  const invitations = useSelector((state: RootStateOrAny) => {
    return state.invitationReducer;
  });
  const dispatch: Function = useDispatch();

  useEffect(() => {
    dispatch(allActions.userActions.fetchUserOrganizedMeetings(user.id));
    dispatch(allActions.userActions.fetchUserParticipatedMeetings(user.id));
    dispatch(allActions.invitationActions.fetchUserPendingInvitations(user.id));
    // eslint-disable-next-line
  }, []);

  return (
    <Container fluid className="ml-5 ml-sm-auto">
      <InvitationList invitations={invitations.basicInvitationInfos} />
      <MeetingList
        meetings={user.organizedMeetings}
        header={'Meetings you organize'}
        noMeetingsInfo={"You don't organize any meeting"}
      />
      <MeetingList
        meetings={user.participatedMeetings}
        header={'Meetings you participate in'}
        noMeetingsInfo={"You don't participate in any meeting"}
      />
    </Container>
  );
};

export default Meetings;
