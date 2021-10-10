import { GeocodeType, PlaceDTO, PlacesSettings } from '../../model/geo/Geo';
import { post, get, put, del } from '../genericApiCalls';
import {
  getGeocoderUrl,
  getMeetingPlacesUrl,
  getNewMeetingPlaceUrl,
  getPlacesVotesUrl,
  getPlaceUrl,
  getVotePlaceUrl,
  getPlacesSettingsUrl,
} from './urls';
//TODO remove mocks and integrate with geo service
const setLoading = (setResponse?: Function) => {
  if (setResponse) {
    setResponse({
      isSuccess: false,
      isFailed: false,
      isLoading: true,
    });
  }
};

const setSuccess = (setResponse?: Function) => {
  if (setResponse) {
    setResponse({
      isSuccess: true,
      isFailed: false,
      isLoading: false,
    });
  }
};

const mockedProposalPlaces: PlaceDTO[] = [];

export const savePlaces = (
  places: PlaceDTO[],
  meetingId: number,
  setResponse?: Function,
  onSuccess?: Function
) => {
  post(
    places,
    getMeetingPlacesUrl(meetingId),
    () => {},
    setResponse,
    true,
    'You have successfully saved selected places',
    onSuccess
  );
};

export const updatePlaces = (
  places: PlaceDTO[],
  meetingId: number,
  setNewPlaces?: Function,
  setResponse?: Function,
  onSuccess?: Function
) => {
  put(
    places,
    getMeetingPlacesUrl(meetingId),
    ({ places }: any) => {
      if (setNewPlaces) setNewPlaces(places);
    },
    setResponse,
    true,
    'You have successfully saved selected places',
    onSuccess
  );
};

export const addNewPlace = (
  place: PlaceDTO,
  setPlaces: Function,
  meetingId: number,
  setResponse?: Function
) => {
  post(
    place,
    getNewMeetingPlaceUrl(meetingId),
    ({ places }: any) => {
      setPlaces(places);
    },
    setResponse,
    true,
    'You have successfully added new place'
  );
};

export const getMeetingPlaces = (
  meetingId: number,
  setPlaces: Function,
  setResponse?: Function
) => {
  get(getMeetingPlacesUrl(meetingId), setPlaces, setResponse);
};

export const getPlaceDetails = (placeId: number, setPlace: Function, setResponse?: Function) => {
  get(getPlaceUrl(placeId), setPlace, setResponse);
};

export const updatePlace = (
  placeId: number,
  placeDetails: PlaceDTO,
  setEditedPlace: Function,
  setResponse?: Function,
  onSuccess?: Function
) => {
  put(
    placeDetails,
    getPlaceUrl(placeId),
    setEditedPlace,
    setResponse,
    true,
    'You have successfully edited a place',
    onSuccess
  );
};

export const deletePlace = (placeId: number, onSuccess?: Function, setResponse?: Function) => {
  del(
    getPlaceUrl(placeId),
    () => {},
    setResponse,
    true,
    'You have successfully removed a place',
    onSuccess
  );
};

export const voteForPlace = (
  palceId: number,
  setNewPlaceDetails: Function,
  onSuccess?: Function,
  setResponse?: Function
) => {
  post(
    {},
    getVotePlaceUrl(palceId),
    setNewPlaceDetails,
    setResponse,
    true,
    'You have successfully voted for the place',
    onSuccess
  );
};

export const voteBackForPlace = (
  palceId: number,
  setNewPlaceDetails: Function,
  onSuccess?: Function,
  setResponse?: Function
) => {
  del(
    getVotePlaceUrl(palceId),
    setNewPlaceDetails,
    setResponse,
    true,
    'You have successfully removed your vote',
    onSuccess
  );
};

export const updateVotes = (
  meetingId: number,
  votes: number[],
  setPlaces: Function,
  setResponse?: Function,
  onSuccess?: Function
) => {
  put(
    { votes },
    getPlacesVotesUrl(meetingId),
    setPlaces,
    setResponse,
    true,
    'You have successfully edited your votes',
    onSuccess
  );
};

export const geocodeByText = (
  searchText: string,
  setProposalPlaces: Function,
  setResponse?: Function
) => {
  setLoading(setResponse);
  setTimeout(() => {
    setSuccess(setResponse);
    setProposalPlaces(mockedProposalPlaces);
  }, 200);
  return;
  // eslint-disable-next-line
  post(
    {
      searchText,
    },
    getGeocoderUrl() + '?type=' + GeocodeType.TEXT,
    setProposalPlaces,
    setResponse,
    true
  );
};

export const geocodeByLocation = (
  latitude: number,
  longitude: number,
  setProposalPlaces: Function,
  setResponse?: Function
) => {
  setLoading(setResponse);
  setTimeout(() => {
    setSuccess(setResponse);
    setProposalPlaces(mockedProposalPlaces);
  }, 200);
  return;
  // eslint-disable-next-line
  post(
    {
      latitude,
      longitude,
    },
    getGeocoderUrl() + '?type=' + GeocodeType.LOCATION,
    setProposalPlaces,
    setResponse,
    true
  );
};

export const getPlacesSettings = (
  meetingsId: number,
  setSettings: Function,
  setResponse?: Function
) => {
  setLoading(setResponse);
  setTimeout(() => {
    setSuccess(setResponse);
    setSettings({
      onlyOrganizerCanAddPlaceToMeeting: false,
    });
  }, 200);
  return;
  // eslint-disable-next-line
  get(getPlacesSettingsUrl(meetingsId), setSettings, setResponse, true);
};

export const savePlacesSettings = (
  meetingsId: number,
  newSettings: PlacesSettings,
  onSuccess?: Function,
  setResponse?: Function
) => {
  setLoading(setResponse);
  setTimeout(() => {
    setSuccess(setResponse);
    if (onSuccess) onSuccess();
  }, 200);
  return;
  // eslint-disable-next-line
  put(
    newSettings,
    getPlacesSettingsUrl(meetingsId),
    () => {},
    setResponse,
    true,
    'You have successfully changed settings.',
    onSuccess
  );
};
