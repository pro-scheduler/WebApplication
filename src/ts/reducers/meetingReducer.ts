import Meeting from '../model/Meeting';

const meetingReducer = (state: Meeting[] = [], action: { type: string; payload: Meeting[] }) => {
  switch (action.type) {
    case 'LOAD_ALL':
      console.log(action);
      return { ...action.payload};
    default:
      return state;
  }
};

export default meetingReducer;
