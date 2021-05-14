import { Meeting, MeetingDTO } from './Meeting';
import { ProUser } from '../user/ProUser';

export const mapMeetingsDTOToMeetings = (meetingsDTO: MeetingDTO[]): Meeting[] => {
  return meetingsDTO.map((meetingDTO: MeetingDTO) => {
    return mapMeetingDTOToMeeting(meetingDTO);
  });
};

// This is needed because due to the many-to-many relationship between user and meeting, we only get user id and email in json
export const mapMeetingDTOToMeeting = (meetingDTO: MeetingDTO): Meeting => {
  const organizers: ProUser[] = meetingDTO.organizers.map((id: number) => {
    return {
      id: id,
      email: '',
      organizedMeetings: [],
      participatedMeetings: [],
    };
  });

  const participants: ProUser[] = meetingDTO.participants.map((id: number) => {
    return {
      id: id,
      email: '',
      organizedMeetings: [],
      participatedMeetings: [],
    };
  });

  return {
    name: meetingDTO.name,
    description: meetingDTO.description,
    id: meetingDTO.id,
    availableTimeRanges: meetingDTO.availableTimeRanges,
    participants: participants,
    organizers: organizers,
  };
};
