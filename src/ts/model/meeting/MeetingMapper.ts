import { Meeting, MeetingDTO, MeetingType, OnlineMeeting, RealMeeting } from './Meeting';
import { ProUser } from '../user/ProUser';

export const mapMeetingsDTOToMeetings = (meetingsDTO: MeetingDTO[]): Meeting[] => {
  return meetingsDTO.map((meetingDTO: MeetingDTO) => {
    return mapMeetingDTOToMeeting(meetingDTO);
  });
};

// This is needed because due to the many-to-many relationship between user and meeting, we only get user id and email in json
export const mapMeetingDTOToMeeting = (meetingDTO: any): Meeting => {
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
  if (meetingDTO.type === MeetingType.REAL)
    return new RealMeeting(
      meetingDTO.id,
      meetingDTO.name,
      meetingDTO.description,
      meetingDTO.availableTimeRanges,
      participants,
      organizers
    );
  return new OnlineMeeting(
    meetingDTO.id,
    meetingDTO.name,
    meetingDTO.description,
    meetingDTO.availableTimeRanges,
    participants,
    organizers,
    meetingDTO.link,
    meetingDTO.password
  );
};
