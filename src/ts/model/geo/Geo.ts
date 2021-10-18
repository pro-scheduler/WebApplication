import { UserSummary } from '../user/ProUser';

export type PlaceDetails = {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  description: string;
  address: string;
  votes: UserSummary[];
};

export type PlaceDTO = {
  latitude: number;
  longitude: number;
  name: string;
  description: string;
  address: string;
};

export type PlacesSettings = {
  onlyOrganizerCanAddPlaceToMeeting: boolean;
};

export type SearchResult = {
  address: { city: string; road: string; postcode: string; country: string };
  lat: string;
  lon: string;
  name: string;
};
