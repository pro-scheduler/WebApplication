import { post, get, put, del } from '../genericApiCalls';
import {
  getDeclarationsUrl,
  getDeclarationUrl,
  getAllMeetingDeclarationsUrl,
  assingToDeclarationUrl,
  unassingToDeclarationUrl,
} from './urls';

export const saveDeclaration = (
  declaration: { title: string; description: string; meetingId: number },
  setDeclaration: Function,
  setResponse?: Function
) =>
  post(
    declaration,
    getDeclarationsUrl(),
    setDeclaration,
    setResponse,
    true,
    'You have successfully added a declartation.'
  );

export const loadDeclaration = (
  declarationId: number,
  setDeclaration: Function,
  setResponse?: Function
) => get(getDeclarationUrl(declarationId), setDeclaration, setResponse);

export const loadMeetingDeclarations = (
  meetingId: number,
  setDeclarations: Function,
  setResponse?: Function
) => get(getAllMeetingDeclarationsUrl(meetingId), setDeclarations, setResponse);

export const loadUserDeclarations = (setDeclarations: Function, setResponse?: Function) =>
  get(getDeclarationsUrl(), setDeclarations, setResponse);

export const updateDeclaration = (
  declarationId: number,
  newDeclaration: { title?: String; description: String },
  setDeclaration: Function,
  setResponse?: Function,
  onSuccess?: Function
) =>
  put(
    newDeclaration,
    getDeclarationUrl(declarationId),
    setDeclaration,
    setResponse,
    true,
    'You have successfully edited the declaration',
    onSuccess
  );

export const deleteDeclaration = (
  declarationId: number,
  setResponse?: Function,
  onSuccess?: Function
) =>
  del(
    getDeclarationUrl(declarationId),
    () => {},
    setResponse,
    true,
    'You have successfully removed a declaration.',
    onSuccess
  );

export const assignToDeclaration = (
  declarationId: number,
  setResponse?: Function,
  onSuccess?: Function
) =>
  post(
    {},
    assingToDeclarationUrl(declarationId),
    () => {},
    setResponse,
    true,
    'User successfully assignees to the declaration',
    onSuccess
  );

export const unassignFromDeclaration = (
  declarationId: number,
  setResponse?: Function,
  onSuccess?: Function
) =>
  post(
    {},
    unassingToDeclarationUrl(declarationId),
    () => {},
    setResponse,
    true,
    'User successfully unassignees from the declaration',
    onSuccess
  );
