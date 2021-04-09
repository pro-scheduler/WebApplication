import { useEffect } from 'react';
import actions from '../../actions/meetingActions';
import { useDispatch, useSelector } from 'react-redux';
import Meeting from '../../model/Meeting';
interface RootState {
  meetings: Meeting[];
}

const CreateMeeting = () => {
  const dispatch: Function = useDispatch();
  const meetings: Meeting[] = useSelector((state: RootState) => {
    console.log(state);
    return state.meetings;
  });

  useEffect(() => {
    dispatch(actions.fetchAllMeetings());
    // eslint-disable-next-line
  }, []);
  // empty [] allows to treat useEffect() as componentDidMount in class components, https://stackoverflow.com/questions/56249151/react-useeffect-hook-componentdidmount-to-useeffect
  return (
    <p>
      {/* tmp need implement view in SCH-65 */}
      {Object.keys(meetings).map((value, index) => {
        return index + ', ';
      })}
    </p>
  );
};

export default CreateMeeting;
