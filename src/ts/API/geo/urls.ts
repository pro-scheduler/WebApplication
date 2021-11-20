import { getMeetingUrl } from '../meeting/urls';

export const getPlacesUrl = () => `${process.env.REACT_APP_GEO_SERVICE_URL}places`;

export const getGeocoderBaseUrl = () => `${process.env.REACT_APP_GEO_SERVICE_URL}geocoder`;

export const getPlaceUrl = (placeId: number) => getPlacesUrl() + `/${placeId}`;

export const getMeetingPlacesUrl = (meetingId: number) => getPlacesUrl() + `/meeting/${meetingId}`;

export const getNewMeetingPlaceUrl = (meetingId: number) => getMeetingPlacesUrl(meetingId) + '/new';

export const getVotePlaceUrl = (placeId: number) => getPlacesUrl() + `/${placeId}/vote`;

export const getGeocoderCordsUrl = () => getGeocoderBaseUrl() + '/cords';

export const getGeocoderTextUrl = () => getGeocoderBaseUrl() + '/search';

export const getPlacesVotesUrl = (meetingId: number) => getMeetingPlacesUrl(meetingId) + '/votes';

export const getPlacesSettingsUrl = (meetingId: number) =>
  getMeetingPlacesUrl(meetingId) + '/settings';

export const getFinalPlaceUrl = (meetingId: number) => getMeetingUrl(meetingId);

export const getChangeFinalPlaceUrl = (meetingId: number) =>
  getMeetingUrl(meetingId) + '/finalPlace';
