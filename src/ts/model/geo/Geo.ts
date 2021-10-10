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

export enum GeocodeType {
  LOCATION = 'LOCATION',
  TEXT = 'TEXT',
}

export type PlacesSettings = {
  onlyOrganizerCanAddPlaceToMeeting: boolean;
};
