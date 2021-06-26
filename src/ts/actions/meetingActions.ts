import { Dispatch } from 'redux';
import { createMeetingSuccess, createMeetingFailed, createMeetingReset } from './messagesActions';
import { getMeetingsUrl, getMeetingUrl, getRemoveUserFromMeetingUrl } from '../API/meeting/urls';
import {
  DeepMeetingDetailsDTO,
  Meeting,
  MeetingDetailsDTO,
  MeetingDTO,
} from '../model/meeting/Meeting';
import { InvitationEmailsDTO } from '../model/invitation/Invitation';
import allActions from './index';
import { SurveyWithQuestionsDTO } from '../model/survey/Survey';
import Cookies from 'js-cookie';

const fetchAllMeetings = () => (dispatch: Dispatch) => {
  fetch(getMeetingsUrl(), {
    headers: {
      Authorization: `Bearer ${Cookies.get('access_token')}`,
    },
  })
    .then((response) => response.json())
    .then((meetingsDTO: MeetingDTO[]) => {
      return dispatch({ type: 'LOAD_ALL', payload: meetingsDTO });
    });
};

// prettier-ignore
const saveMeeting = (
  meeting: MeetingDetailsDTO,
  invitations: InvitationEmailsDTO,
  survey: SurveyWithQuestionsDTO
) => (dispatch: Dispatch) => {
  dispatch(createMeetingReset());

  fetch(getMeetingsUrl(), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Cookies.get('access_token')}`,
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
          allActions.surveyActions.createSurvey(meeting.id, survey).then((response) => response.json().then(console.log));
        }
        return dispatch(createMeetingSuccess('Meeting has been created successfully :)'));
      });
    } else {
      return dispatch(createMeetingFailed('Meeting has not been created ;/'));
    }
  })
};

const loadMeeting = (id: number) => (dispatch: Dispatch) => {
  fetch(getMeetingUrl(id), {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Cookies.get('access_token')}`,
    },
  })
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
      Authorization: `Bearer ${Cookies.get('access_token')}`,
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
