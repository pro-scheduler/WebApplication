import { Meeting, MeetingType } from '../model/meeting/Meeting';

type meetingState = { meetings: Meeting[]; meeting: Meeting };

const initialMeeting: Meeting = {
  name: '',
  description: '',
  id: 0,
  availableTimeRanges: [],
  participants: [],
  organizers: [],
  type: MeetingType.REAL,
};

const defaultState: meetingState = {
  meetings: [],
  meeting: initialMeeting,
};

const meetingReducer = (
  state: meetingState = defaultState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case 'LOAD_ALL':
      console.log(action);
      return { ...state, meetings: action.payload };
    case 'LOAD_ONE':
      console.log(action);
      return { ...state, meeting: action.payload };
    default:
      return state;
  }
};

export default meetingReducer;
