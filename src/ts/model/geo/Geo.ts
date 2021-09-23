import { UserSummary } from '../user/ProUser';

export type PlaceDetails = {
  id: number;
  lat: number;
  long: number;
  name: string;
  description: string;
  address: string;
  votes: UserSummary[];
};

export type PlaceDTO = {
  lat: number;
  long: number;
  name: string;
  description: string;
  address: string;
};

export enum GeocodeType {
  LOCATION = 'LOCATION',
  TEXT = 'TEXT',
}
