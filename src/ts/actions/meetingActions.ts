import Meeting from "../model/Meeting";
import { Dispatch } from 'redux';

// function makeASandwichWithSecretSauce(forPerson) {
//     // We can invert control here by returning a function - the "thunk".
//     // When this function is passed to `dispatch`, the thunk middleware will intercept it,
//     // and call it with `dispatch` and `getState` as arguments.
//     // This gives the thunk function the ability to run some logic, and still interact with the store.
//     return function(dispatch) {
//       return fetchSecretSauce().then(
//         (sauce) => dispatch(makeASandwich(forPerson, sauce)),
//         (error) => dispatch(apologize('The Sandwich Shop', forPerson, error)),
//       );
//     };
//   }


const fetchAllMeetings = () => (dispatch:Dispatch) => {
   fetch("http://localhost:8080/api/meetings")
        .then(response => response.json())
        .then( meetings =>  {console.log(meetings); return dispatch({type: "LOAD_ALL", payload: meetings})}
        //   (error) => dispatch(apologize('The Sandwich Shop', forPerson, error)),
        );
}

const loadMeeting = (id: number) => {
  return {
      type: "LOAD_ALL",
      payload: id
  }
}

const addMeeting = (meeting: Meeting) => {
    return {
      type: 'ADD_MEETING',
      payload: meeting,
    }
  }
  
  const deleteMeeting = (id: number) => {
    return {
      type: 'LOG_OUT',
      payload: id
    }
  }

  const updateMeeting = (meeting: Meeting) =>{
    return {
        type: 'UPDATE_MEETING',
        payload: meeting
      }
  }
  
  const actions = { 
    addMeeting,
    deleteMeeting,
    updateMeeting,
    fetchAllMeetings,
    loadMeeting
 };
  
  export default actions;
  