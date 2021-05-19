import { Dispatch } from 'redux';
import { createMeetingSuccess, createMeetingFailed, createMeetingReset } from './messagesActions';
import { getMeetingsUrl, getMeetingUrl, getRemoveUserFromMeetingUrl } from '../API/meeting/urls';
import { DeepMeetingDetailsDTO, Meeting, MeetingDTO } from '../model/meeting/Meeting';
import { InvitationEmailsDTO } from '../model/invitation/Invitation';
import allActions from './index';
import { SurveyWithQuestionsDTO } from '../model/survey/Survey';

const fetchAllMeetings = () => (dispatch: Dispatch) => {
  fetch(getMeetingsUrl())
    .then((response) => response.json())
    .then((meetingsDTO: MeetingDTO[]) => {
      return dispatch({ type: 'LOAD_ALL', payload: meetingsDTO });
    });
};

// prettier-ignore
const saveMeeting = (
  meeting: Meeting,
  invitations: InvitationEmailsDTO,
  survey: SurveyWithQuestionsDTO
) => (dispatch: Dispatch) => {
  dispatch(createMeetingReset());

  fetch(getMeetingsUrl(), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(meeting),
  }).then((response) => {
    if (response.status === 201) {
      response.json().then((meeting: DeepMeetingDetailsDTO) => {
        if (invitations.emails.length > 0) {
          allActions.invitationActions
            .createInvitations(meeting.id, invitations)
            .then(() => void 0);
        }
        if (survey.questions.length > 0) {
          allActions.surveyActions.createSurvey(meeting.id, survey).then(() => void 0);
        }
        return dispatch(createMeetingSuccess('Meeting has been created successfully :)'));
      });
    } else {
      return dispatch(createMeetingFailed('Meeting has not been created ;/'));
    }
  });
};

const loadMeeting = (id: number) => (dispatch: Dispatch) => {
  fetch(getMeetingUrl(id))
    .then((response: Response) => response.json())
    .then((deepMeetingDetailsDTO: DeepMeetingDetailsDTO) => {
      return dispatch({ type: 'LOAD_ONE', payload: deepMeetingDetailsDTO });
    });
};

const removeUserFromMeeting = (meetingId: number, userId: number) => {
  fetch(getRemoveUserFromMeetingUrl(meetingId), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: userId,
    }),
  }).then((response) => {
    console.log(response);
  });
};

const deleteMeeting = (id: number) => {
  return {
    type: 'DELETE_MEETING',
    payload: id,
  };
};

const updateMeeting = (meeting: Meeting) => {
  return {
    type: 'UPDATE_MEETING',
    payload: meeting,
  };
};

const actions = {
  deleteMeeting,
  updateMeeting,
  fetchAllMeetings,
  loadMeeting,
  saveMeeting,
  removeUserFromMeeting,
};

export default actions;
