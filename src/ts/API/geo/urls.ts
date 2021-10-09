export const getPlacesUrl = () => `${process.env.REACT_APP_GEO_SERVICE_URL}places`;

export const getPlaceUrl = (placeId: number) => getPlacesUrl() + `/${placeId}`;

export const getMeetingPlacesUrl = (meetingId: number) => getPlacesUrl() + `/meeting/${meetingId}`;

export const getNewMeetingPlaceUrl = (meetingId: number) => getMeetingPlacesUrl(meetingId) + '/new';

export const getVotePlaceUrl = (placeId: number) => getPlacesUrl() + `/${placeId}/vote`;

export const getGeocoderUrl = () => `${process.env.REACT_APP_DECLARATION_SERVICE_URL}gecoder`;

export const getPlacesVotesUrl = (meetingId: number) => getMeetingPlacesUrl(meetingId) + '/votes';

export const getPlacesSettingsUrl = (meetingId: number) =>
  getMeetingPlacesUrl(meetingId) + '/settings';
