export const getDeclarationsUrl = () =>
  `${process.env.REACT_APP_DECLARATION_SERVICE_URL}declarations`;

export const getDeclarationUrl = (declarationId: number) =>
  getDeclarationsUrl() + `/${declarationId}`;

export const getAllMeetingDeclarationsUrl = (meetingId: number) =>
  getDeclarationsUrl() + `?meetingId=${meetingId}`;

export const assingToDeclarationUrl = (declarationId: number) =>
  getDeclarationsUrl() + `/${declarationId}/assign`;

export const unassingToDeclarationUrl = (declarationId: number) =>
  getDeclarationsUrl() + `/${declarationId}/unassign`;
