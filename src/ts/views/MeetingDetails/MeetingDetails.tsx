import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Container from 'react-bootstrap/Container';
import MeetingDescription from '../../components/MeetingDetails/MeetingDescription';
import MeetingParticipants from '../../components/MeetingDetails/MeetingParticipants';
import MeetingTime from '../../components/MeetingDetails/MeetingTime/MeetingTime';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import allActions from '../../actions';
// import actions from '../../actions/meetingActions';
import { loadMeeting } from '../../API/meeting/meetinService';
import surveyActions from '../../actions/surveyActions';
import { ProUser } from '../../model/user/ProUser';
import { Meeting } from '../../model/meeting/Meeting';
import { UserSurvey } from '../../model/survey/Survey';
import MeetingSurvey from '../../components/MeetingDetails/MeetingSurvey/MeetingSurvey';
import { ApiCall } from '../../API/genericApiCalls';
import LoadingSpinner from '../../components/common/Spinner/LoadingSpinner';

const MeetingDetails = () => {
  const dispatch: Function = useDispatch();
  const { id }: any = useParams();
  // const meetingState = useSelector((state: RootStateOrAny) => {
  //   return state.meetings;
  // });
  const [meetingResponse, setMettingResponse] = useState<ApiCall<any>>(new ApiCall<any>());
  const user: ProUser = useSelector((state: RootStateOrAny) => {
    return state.userReducer;
  });
  const [survey, setSurvey] = useState<UserSurvey | undefined>(undefined);

  useEffect(() => {
    // dispatch(actions.loadMeeting(id));
    loadMeeting(id, setMettingResponse);
    dispatch(allActions.userActions.fetchUserOrganizedMeetings(user.id));
    surveyActions.getSurveyForMeeting(id).then((value) => setSurvey(value));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log(meetingResponse);
  }, [meetingResponse]);
  return meetingResponse.isSuccess ? (
    <div>
      <Container fluid className="ml-lg-5 ml-sm-auto">
        <MeetingDescription
          name={meetingResponse.data.name}
          meetingId={id}
          description={meetingResponse.data.description}
          organizers={meetingResponse.data.organizers}
          link={meetingResponse.data.link}
          password={meetingResponse.data.password}
        />
        <MeetingParticipants
          meetingId={id}
          participants={meetingResponse.data.participants}
          isOrganizer={
            user.organizedMeetings
              .filter((meeting: Meeting) => meeting.id === parseInt(id))
              .pop() !== undefined
          }
        />
        {meetingResponse.data.availableTimeRanges.length > 0 && (
          <MeetingTime meetingId={id} timeRanges={meetingResponse.data.availableTimeRanges} />
        )}
        {survey && <MeetingSurvey survey={survey} />}
      </Container>
    </div>
  ) : (
    <LoadingSpinner acitve={meetingResponse.isLoading} />
  );
};

export default MeetingDetails;
