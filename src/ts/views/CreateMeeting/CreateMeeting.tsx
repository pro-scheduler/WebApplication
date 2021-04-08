import {useEffect} from 'react';
import actions from '../../actions/meetingActions';
import { useDispatch, useSelector } from 'react-redux';
import Meeting from '../../model/Meeting';

interface RootState {
  meetingReducer: Meeting[]
}

const CreateMeeting = () => {

  const dispatch = useDispatch();
  const meetings = useSelector((state: RootState) => {console.log("refresh:"); console.log(state); return state.meetingReducer} )

  useEffect( () => {
    dispatch(actions.fetchAllMeetings());
  }, []);
  // empty [] allows to treat useEffect() as componentDidMount in class components, https://stackoverflow.com/questions/56249151/react-useeffect-hook-componentdidmount-to-useeffect
    return <p>
      {/* tmp need implement view in SCH-65 */}
      {Object.keys(meetings).map((value, index) => {
        return index + ", "
      })}
    </p>;
}

export default CreateMeeting;
