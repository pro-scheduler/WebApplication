import { GeocodeType, PlaceDTO } from '../../model/geo/Geo';
import { post, get, put, del } from '../genericApiCalls';
import {
  getGeocoderUrl,
  getMeetingPlacesUrl,
  getNewMeetingPlaceUrl,
  getPlacesVotesUrl,
  getPlaceUrl,
  getVotePlaceUrl,
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

const mockedProposalPlaces = [
  {
    latitude: 50.068074402115116,
    longitude: 19.912639700937756,
    name: 'Katedra Informatki AGH',
    description: 'Nasz ulubione miejsce',
    address: 'Akademia Górniczo-Hutnicza im. Stanisława Staszica w Krakowie, 30-001 Kraków',
  },
  {
    latitude: 50.061781852877736,
    longitude: 19.93740285479882,
    name: 'Rynek główny',
    description: 'Jedna z opcji, możemy spotkać się przy rynku głównym',
    address: '',
  },
  {
    latitude: 50.061781852877736,
    longitude: 19.92740285479882,
    name: 'Rynek główny',
    description: 'Jedna z opcji, możemy spotkać się przy rynku głównym',
    address: '',
  },
];

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
  setNewPlace: Function,
  meetingId: number,
  setResponse?: Function
) => {
  post(
    place,
    getNewMeetingPlaceUrl(meetingId),
    setNewPlace,
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
