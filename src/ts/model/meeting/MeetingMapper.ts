import MeetingDTO from './MeetingDTO';
import Meeting from './Meeting';
import ProUser from '../ProUser';

export const mapMeetingsDTOToMeetings = (meetingsDTO: MeetingDTO[]): Meeting[] => {
  return meetingsDTO.map((meetingDTO: MeetingDTO) => {
    return mapMeetingDTOToMeeting(meetingDTO);
  });
};

// This is needed because due to the many-to-many relationship between user and meeting, we only get user id in json
export const mapMeetingDTOToMeeting = (meetingDTO: MeetingDTO): Meeting => {
  const organizers: ProUser[] = meetingDTO.organizers.map((id: number) => {
    return {
      id: id,
      organizedMeetings: [],
      attendees: [],
      participatedMeetings: [],
    };
  });

  const attendees: ProUser[] = meetingDTO.attendees.map((id: number) => {
    return {
      id: id,
      organizedMeetings: [],
      attendees: [],
      participatedMeetings: [],
    };
  });

  return {
    name: meetingDTO.name,
    description: meetingDTO.description,
    id: meetingDTO.id,
    availableTimeRanges: meetingDTO.availableTimeRanges,
    attendees: attendees,
    organizers: organizers,
  };
};
