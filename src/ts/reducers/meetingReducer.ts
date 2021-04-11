import Meeting from '../model/Meeting';

type meetingState = { meetings: Meeting[] };

const defaultState: meetingState = {
  meetings: [],
};

const meetingReducer = (
  state: meetingState = defaultState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case 'LOAD_ALL':
      console.log(action);
      return { ...state, meetings: action.payload };
    default:
      return state;
  }
};

export default meetingReducer;
