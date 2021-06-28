import Cookies from 'js-cookie';
import { toastError, toastSuccess } from '../tools/messagesInvocator';

export class ApiCall<ResponseType> {
  constructor(
    public isSuccess: boolean = false,
    public isFailed: boolean = false,
    public isLoading: boolean = false,
    public faildMessage: string = '',
    public data?: ResponseType
  ) {}
}

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: `Bearer ${Cookies.get('access_token')}`,
};

const setLoading = (setResponse?: Function) => {
  if (setResponse) {
    setResponse({
      isSuccess: false,
      isFailed: false,
      isLoading: true,
      faildMessage: '',
      data: null,
    });
  }
};

const setFailed = (message: string, setResponse?: Function) => {
  if (setResponse) {
    setResponse({
      isSuccess: false,
      isFailed: true,
      isLoading: false,
      faildMessage: message,
      data: null,
    });
  }
};

const setSuccess = (result: any, setResponse?: Function) => {
  if (setResponse) {
    setResponse({
      isSuccess: true,
      isFailed: false,
      isLoading: false,
      faildMessage: '',
      data: result,
    });
  }
};
export const post = (
  data: any,
  apiLink: string,
  setResponse?: Function,
  showFailed?: boolean,
  successMessage?: string
) => {
  setLoading(setResponse);
  fetch(apiLink, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      if (result.status !== undefined && (result.status < 200 || result.status >= 300)) {
        if (result.status === 401) {
          setFailed('Not Authorized', setResponse);
          if (showFailed) toastError('You are not Authorized, please log in.');
        } else {
          setFailed(result.detail, setResponse);
          if (showFailed) toastError(result.title + ' ' + result.detail);
        }
      } else {
        setSuccess(result, setResponse);
        if (successMessage) toastSuccess(successMessage);
      }
    })
    .catch((error) => {
      setFailed(error, setResponse);
      if (showFailed) toastError(error);
    });
};

export const get = (
  apiLink: string,
  setResponse?: Function,
  successMessage?: string,
  showFailed?: boolean
) => {
  setLoading(setResponse);
  fetch(apiLink, {
    method: 'GET',
    headers,
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      if (result.status !== undefined && (result.status < 200 || result.status >= 300)) {
        if (result.status === 401) {
          setFailed('Not Authorized', setResponse);
          if (showFailed) toastError('You are not Authorized, please log in.');
        } else {
          setFailed(result.detail, setResponse);
          if (showFailed) toastError(result.title + ' ' + result.detail);
        }
      } else {
        setSuccess(result, setResponse);
        if (successMessage) toastSuccess(successMessage);
      }
    })
    .catch((error) => {
      setFailed(error, setResponse);
      if (showFailed) toastError(error);
    });
};
