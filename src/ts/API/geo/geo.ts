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

const testingUser = { id: 2, email: 'radek4ec@gmail.com', username: 'radek4ec@gmail.com' };
const mockedProposalPlaces = [
  {
    lat: 50.068074402115116,
    long: 19.912639700937756,
    name: 'Katedra Informatki AGH',
    description: 'Nasz ulubione miejsce',
    address: 'Akademia Górniczo-Hutnicza im. Stanisława Staszica w Krakowie, 30-001 Kraków',
  },
  {
    lat: 50.061781852877736,
    long: 19.93740285479882,
    name: 'Rynek główny',
    description: 'Jedna z opcji, możemy spotkać się przy rynku głównym',
    address: '',
  },
  {
    lat: 50.061781852877736,
    long: 19.92740285479882,
    name: 'Rynek główny',
    description: 'Jedna z opcji, możemy spotkać się przy rynku głównym',
    address: '',
  },
];

const mockedPlaces = [
  {
    id: 0,
    lat: 50.068074402115116,
    long: 19.912639700937756,
    name: 'Katedra Informatki AGH',
    description: 'Nasz ulubione miejsce',
    address: 'Akademia Górniczo-Hutnicza im. Stanisława Staszica w Krakowie, 30-001 Kraków',
    votes: [testingUser],
  },
  {
    id: 1,
    lat: 50.061781852877736,
    long: 19.93740285479882,
    name: 'Rynek główny',
    description: 'Jedna z opcji, możemy spotkać się przy rynku głównym',
    address: '',
    votes: [
      testingUser,
      { id: 3, email: 'radek4ec@gmail.com', username: 'radek4ec@gmail.com' },
      { id: 1, email: 'radek4ec@gmail.com', username: 'radek4ec@gmail.com' },
    ],
  },
  {
    id: 2,
    lat: 50.061781852877736,
    long: 19.92740285479882,
    name: 'Rynek główny',
    description: 'Jedna z opcji, możemy spotkać się przy rynku głównym',
    address: '',
    votes: [{ id: 234, email: 'radek4ec@gmail.com', username: 'radek4ec@gmail.com' }],
  },
];

const mockedPlacesAfterVotes = [
  {
    id: 0,
    lat: 50.068074402115116,
    long: 19.912639700937756,
    name: 'Katedra Informatki AGH',
    description: 'Nasz ulubione miejsce',
    address: 'Akademia Górniczo-Hutnicza im. Stanisława Staszica w Krakowie, 30-001 Kraków',
    votes: [testingUser],
  },
  {
    id: 1,
    lat: 50.061781852877736,
    long: 19.93740285479882,
    name: 'Rynek główny',
    description: 'Jedna z opcji, możemy spotkać się przy rynku głównym',
    address: '',
    votes: [],
  },
  {
    id: 2,
    lat: 50.061781852877736,
    long: 19.92740285479882,
    name: 'Rynek główny',
    description: 'Jedna z opcji, możemy spotkać się przy rynku głównym',
    address: '',
    votes: [],
  },
];
let mockedPlace = {
  id: 2,
  lat: 50.061781852877736,
  long: 19.92740285479882,
  name: 'Rynek główny',
  description: 'Jedna z opcji, możemy spotkać się przy rynku głównym',
  address: '',
  votes: [],
};
export const savePlaces = (
  places: PlaceDTO[],
  meetingId: number,
  setResponse?: Function,
  onSuccess?: Function
) => {
  setLoading(setResponse);
  setTimeout(() => {
    setSuccess(setResponse);
    if (onSuccess) onSuccess();
  }, 500);
  return;
  // eslint-disable-next-line
  post(
    {
      places,
      meetingId,
    },
    getMeetingPlacesUrl(meetingId),
    () => {},
    setResponse,
    true,
    'You have successfully saved selected places'
  );
};

export const updatePlaces = (
  places: PlaceDTO[],
  meetingId: number,
  setNewPlaces?: Function,
  setResponse?: Function,
  onSuccess?: Function
) => {
  setLoading(setResponse);
  setTimeout(() => {
    setSuccess(setResponse);
    if (onSuccess) onSuccess();
    if (setNewPlaces) setNewPlaces(places);
  }, 500);
  return;
  // eslint-disable-next-line
  put(
    {
      places,
      meetingId,
    },
    getMeetingPlacesUrl(meetingId),
    setNewPlaces,
    setResponse,
    true,
    'You have successfully saved selected places'
  );
};

export const addNewPlace = (
  place: PlaceDTO,
  setNewPlace: Function,
  meetingId: number,
  setResponse?: Function
) => {
  setLoading(setResponse);
  setTimeout(() => {
    setSuccess(setResponse);
    setNewPlace({ ...place, id: Math.random() * 1000, votes: [] });
  }, 500);
  return;
  // eslint-disable-next-line
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
  setLoading(setResponse);
  setTimeout(() => {
    setSuccess(setResponse);
    setPlaces(mockedPlaces);
  }, 500);
  return;
  // eslint-disable-next-line
  get(getMeetingPlacesUrl(meetingId), setPlaces, setResponse);
};

export const getPlaceDetails = (placeId: number, setPlace: Function, setResponse?: Function) => {
  setLoading(setResponse);
  setTimeout(() => {
    setSuccess(setResponse);
    setPlace(mockedPlace);
  }, 500);
  return;
  // eslint-disable-next-line
  get(getPlaceUrl(placeId), setPlace, setResponse);
};

export const updatePlace = (
  placeId: number,
  placeDetails: PlaceDTO,
  setEditedPlace: Function,
  setResponse?: Function,
  onSuccess?: Function
) => {
  setLoading(setResponse);
  setTimeout(() => {
    setSuccess(setResponse);
    setEditedPlace({ ...placeDetails, id: Math.random() * 1000, votes: [] });
    if (onSuccess) onSuccess();
  }, 500);
  return;
  // eslint-disable-next-line
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
  setLoading(setResponse);
  setTimeout(() => {
    setSuccess(setResponse);
    if (onSuccess) onSuccess();
  }, 500);
  return;
  // eslint-disable-next-line
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
  setLoading(setResponse);
  setTimeout(() => {
    setSuccess(setResponse);
    if (onSuccess) onSuccess();
    setNewPlaceDetails(
      mockedPlacesAfterVotes
        .filter((p) => p.id === palceId)
        .map((place) => {
          return { ...place, votes: [...place.votes, testingUser] };
        })[0]
    );
  }, 500);
  return;
  // eslint-disable-next-line
  post(
    {},
    getVotePlaceUrl(palceId),
    () => {},
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
  setLoading(setResponse);
  setTimeout(() => {
    setSuccess(setResponse);
    if (onSuccess) onSuccess();
    setNewPlaceDetails(
      mockedPlacesAfterVotes
        .filter((p) => p.id === palceId)
        .map((place) => {
          return { ...place, votes: [...place.votes.filter((vote) => vote.id !== testingUser.id)] };
        })[0]
    );
  }, 500);
  return;
  // eslint-disable-next-line
  del(
    getVotePlaceUrl(palceId),
    () => {},
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
  setLoading(setResponse);
  setTimeout(() => {
    setSuccess(setResponse);
    if (onSuccess) onSuccess();
    setPlaces([...mockedPlacesAfterVotes]);
  }, 500);
  return;
  // eslint-disable-next-line
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
  lat: number,
  long: number,
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
      lat,
      long,
    },
    getGeocoderUrl() + '?type=' + GeocodeType.LOCATION,
    setProposalPlaces,
    setResponse,
    true
  );
};