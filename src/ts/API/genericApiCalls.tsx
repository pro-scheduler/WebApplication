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
export const post = (
  data: any,
  apiLink: string,
  setResponse: Function,
  successMessage?: string
) => {
  setResponse({
    isSuccess: false,
    isFailed: false,
    isLoading: true,
    faildMessage: '',
    data: null,
  });
  fetch(apiLink, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      if (result.status !== undefined && (result.status < 200 || result.status >= 300)) {
        setResponse({
          isSuccess: false,
          isFailed: true,
          isLoading: false,
          faildMessage: result.detail,
          data: null,
        });
        toastError(result.title + ' ' + result.detail);
      } else {
        setResponse({
          isSuccess: true,
          isFailed: false,
          isLoading: false,
          faildMessage: '',
          data: result,
        });
        if (successMessage) toastSuccess(successMessage);
      }
    })
    .catch((error) => {
      setResponse({
        isSuccess: false,
        isFailed: true,
        isLoading: false,
        faildMessage: error.reason,
        data: null,
      });
    });
};
