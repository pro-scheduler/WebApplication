import Cookies from 'js-cookie';
import { toastError, toastSuccess } from '../tools/messagesInvocator';

export class ApiCall {
  constructor(
    public isSuccess: boolean = false,
    public isFailed: boolean = false,
    public isLoading: boolean = false
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
    });
  }
};

const setFailed = (setResponse?: Function) => {
  if (setResponse) {
    setResponse({
      isSuccess: false,
      isFailed: true,
      isLoading: false,
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

const handleResponse = (
  response: Response,
  setResponse?: Function,
  successMessage?: string,
  onSuccess?: Function
) => {
  if (response.status !== undefined && (response.status < 200 || response.status >= 300)) {
    setFailed(setResponse);
  } else if (response.status !== undefined && response.status >= 200 && response.status < 300) {
    setSuccess(setResponse);
    if (successMessage) toastSuccess(successMessage);
    if (onSuccess) onSuccess();
  }
  return response.json();
};
export const post = (
  data: any,
  apiLink: string,
  setData?: Function,
  setResponse?: Function,
  showFailed?: boolean,
  successMessage?: string,
  onSuccess?: Function
) => {
  setLoading(setResponse);
  fetch(apiLink, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  })
    .then((response: Response) => {
      return handleResponse(response, setResponse, successMessage, onSuccess);
    })
    .then((result) => {
      if (result.status !== undefined && (result.status < 200 || result.status >= 300)) {
        if (result.status === 401 && showFailed)
          toastError('You are not Authorized, please log in.');
        else if (showFailed) toastError(result.title + ' ' + result.detail);
      } else {
        if (setData) setData(result);
        if (onSuccess) onSuccess();
      }
    })
    .catch((error) => {
      setFailed(setResponse);
      if (showFailed) toastError(error);
    });
};

export const get = (
  apiLink: string,
  setResponseData: Function,
  setResponse?: Function,
  showFailed?: boolean,
  successMessage?: string,
  onSuccess?: Function
) => {
  setLoading(setResponse);
  fetch(apiLink, {
    method: 'GET',
    headers,
  })
    .then((response: Response) => {
      return handleResponse(response, setResponse, successMessage, onSuccess);
    })
    .then((result) => {
      if (result.status !== undefined && (result.status < 200 || result.status >= 300)) {
        if (result.status === 401 && showFailed)
          toastError('You are not Authorized, please log in.');
        else if (showFailed) toastError(result.title + ' ' + result.detail);
      } else {
        setResponseData(result);
        if (successMessage) toastSuccess(successMessage);
        if (onSuccess) onSuccess();
      }
    })
    .catch((error) => {
      setFailed(setResponse);
      if (showFailed) toastError(error);
    });
};

export const put = (
  data: any,
  apiLink: string,
  setData?: Function,
  setResponse?: Function,
  showFailed?: boolean,
  successMessage?: string,
  onSuccess?: Function
) => {
  setLoading(setResponse);
  fetch(apiLink, {
    method: 'PUT',
    headers,
    body: JSON.stringify(data),
  })
    .then((response: Response) => {
      return handleResponse(response, setResponse, successMessage, onSuccess);
    })
    .then((result) => {
      if (result.status !== undefined && (result.status < 200 || result.status >= 300)) {
        if (result.status === 401 && showFailed)
          toastError('You are not Authorized, please log in.');
        else if (showFailed) toastError(result.title + ' ' + result.detail);
      } else {
        if (setData) setData(result);
        if (onSuccess) onSuccess();
      }
    })
    .catch((error) => {
      setFailed(setResponse);
      if (showFailed) toastError(error);
    });
};
