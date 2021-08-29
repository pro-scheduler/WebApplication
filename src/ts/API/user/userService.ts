import { getCurrentUserUrl } from './urls';
import { get } from '../genericApiCalls';

export const fetchCurrentUser = (setUser: Function, setResponse?: Function) =>
  get(getCurrentUserUrl(), setUser, setResponse);
