import { PlaceDTO, PlacesSettings } from '../../model/geo/Geo';
import { post, get, put, del } from '../genericApiCalls';
import {
  getGeocoderCordsUrl,
  getGeocoderTextUrl,
  getMeetingPlacesUrl,
  getNewMeetingPlaceUrl,
  getPlacesVotesUrl,
  getPlaceUrl,
  getVotePlaceUrl,
  getPlacesSettingsUrl,
} from './urls';

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
  searchString: string,
  setProposalPlaces: Function,
  setResponse?: Function
) =>
  post(
    {
      searchString,
    },
    getGeocoderTextUrl(),
    setProposalPlaces,
    setResponse,
    true
  );

export const geocodeByLocation = (
  lat: number,
  lon: number,
  setProposalPlaces: Function,
  setResponse?: Function
) =>
  post(
    {
      lat,
      lon,
    },
    getGeocoderCordsUrl(),
    setProposalPlaces,
    setResponse,
    true
  );

export const getPlacesSettings = (
  meetingsId: number,
  setSettings: Function,
  setResponse?: Function
) => get(getPlacesSettingsUrl(meetingsId), setSettings, setResponse, true);

export const savePlacesSettings = (
  meetingsId: number,
  newSettings: PlacesSettings,
  onSuccess?: Function,
  setResponse?: Function
) =>
  put(
    newSettings,
    getPlacesSettingsUrl(meetingsId),
    () => {},
    setResponse,
    true,
    'You have successfully changed settings.',
    onSuccess
  );
