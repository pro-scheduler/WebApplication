import { post, get, put } from '../genericApiCalls';
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
) => {
  setTimeout(() => {
    setDeclaration({
      id: 11,
      meetingId: 5,
      title: declaration.title,
      description: declaration.description,
      createdBy: {
        id: 12,
        email: 'b@test.com',
        username: 'user1',
      },
      assigned: [
        {
          id: 10,
          email: 'a@test.com',
          username: 'user',
        },
      ],
    });
  }, 500);
  return;
  // eslint-disable-next-line
  post(
    declaration,
    getDeclarationsUrl(),
    setDeclaration,
    setResponse,
    true,
    'You have successfully added a declartation.'
  );
};

export const loadDeclaration = (
  declarationId: number,
  setDeclaration: Function,
  setResponse?: Function
) => {
  setTimeout(() => {
    setDeclaration({
      id: 11,
      meetingId: 5,
      title: 'Some meeting',
      description: 'Some description',
      // you can put here your email to see decclaration card as an owner
      createdBy: {
        id: 12,
        email: 'radek4ec@gmail.com',
        username: 'user1',
      },
      assigned: [
        {
          id: 10,
          email: 'a@test.com',
          username: 'user',
        },
      ],
    });
  }, 500);
  return;
  // eslint-disable-next-line
  get(getDeclarationUrl(declarationId), setDeclaration, setResponse);
};

export const loadMeetingDeclarations = (
  meetingId: number,
  setDeclarations: Function,
  setResponse?: Function
) => {
  setTimeout(() => {
    setDeclarations([
      {
        id: 11,
        meetingId: 5,
        title: 'Some meeting',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla semper enim et dui scelerisque maximus. Vestibulum at placerat sem. Sed vitae ante eget diam ornare congue at non turpis. Integer nec odio feugiat, aliquet lacus sit amet, aliquet nulla nullam. ',
        // you can put here your email to see decclaration card as an owner
        createdBy: {
          id: 12,
          email: 'radek4ec@gmail.com',
          username: 'user1',
        },
        // you can put here your email to see decclarassigned card view
        assigned: [
          {
            id: 12,
            email: 'radek4ec@gmail.com',
            username: 'user1',
          },
          {
            id: 10,
            email: 'c@test.com',
            username: 'user',
          },
          {
            id: 10,
            email: 'r@test.com',
            username: 'user',
          },
        ],
      },
      {
        id: 12,
        meetingId: 5,
        title: 'Some meeting',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla semper enim et dui scelerisque maximus. Vestibulum at placerat sem. Sed vitae ante eget diam ornare congue at non turpis. Integer nec odio feugiat, aliquet lacus sit amet, aliquet nulla nullam. ',
        createdBy: {
          id: 12,
          email: 'b@test.com',
          username: 'user1',
        },
        // you can put here your email to see decclarassigned card view
        assigned: [
          {
            id: 12,
            email: 'radek4ec@gmail.com',
            username: 'user1',
          },
          {
            id: 10,
            email: 'c@test.com',
            username: 'user',
          },
          {
            id: 10,
            email: 'r@test.com',
            username: 'user',
          },
        ],
      },
      {
        id: 13,
        meetingId: 5,
        title: 'Some meeting',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla semper enim et dui scelerisque maximus. Vestibulum at placerat sem. Sed vitae ante eget diam ornare congue at non turpis. Integer nec odio feugiat, aliquet lacus sit amet, aliquet nulla nullam. ',
        createdBy: {
          id: 12,
          email: 'b@test.com',
          username: 'user1',
        },
        assigned: [
          {
            id: 10,
            email: 'a@test.com',
            username: 'user',
          },
          {
            id: 10,
            email: 'c@test.com',
            username: 'user',
          },
          {
            id: 10,
            email: 'r@test.com',
            username: 'user',
          },
        ],
      },
      {
        id: 14,
        meetingId: 5,
        title: 'Some meeting',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla semper enim et dui scelerisque maximus. Vestibulum at placerat sem. Sed vitae ante eget diam ornare congue at non turpis. Integer nec odio feugiat, aliquet lacus sit amet, aliquet nulla nullam. ',
        createdBy: {
          id: 12,
          email: 'radek4ec@gmail.com',
          username: 'user1',
        },
        assigned: [
          {
            id: 10,
            email: 'a@test.com',
            username: 'user',
          },
          {
            id: 10,
            email: 'c@test.com',
            username: 'user',
          },
          {
            id: 10,
            email: 'r@test.com',
            username: 'user',
          },
        ],
      },
      {
        id: 15,
        meetingId: 5,
        title: 'Some meeting',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla semper enim et dui scelerisque maximus. Vestibulum at placerat sem. Sed vitae ante eget diam ornare congue at non turpis. Integer nec odio feugiat, aliquet lacus sit amet, aliquet nulla nullam. ',
        createdBy: {
          id: 12,
          email: 'b@test.com',
          username: 'user1',
        },
        assigned: [
          {
            id: 10,
            email: 'a@test.com',
            username: 'user',
          },
          {
            id: 10,
            email: 'c@test.com',
            username: 'user',
          },
          {
            id: 10,
            email: 'r@test.com',
            username: 'user',
          },
        ],
      },
      {
        id: 16,
        meetingId: 5,
        title: 'Some meeting',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla semper enim et dui scelerisque maximus. Vestibulum at placerat sem. Sed vitae ante eget diam ornare congue at non turpis. Integer nec odio feugiat, aliquet lacus sit amet, aliquet nulla nullam. ',
        createdBy: {
          id: 12,
          email: 'b@test.com',
          username: 'user1',
        },
        assigned: [
          {
            id: 10,
            email: 'a@test.com',
            username: 'user',
          },
          {
            id: 10,
            email: 'c@test.com',
            username: 'user',
          },
          {
            id: 10,
            email: 'r@test.com',
            username: 'user',
          },
        ],
      },
      {
        id: 17,
        meetingId: 5,
        title: 'Some meeting',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla semper enim et dui scelerisque maximus. Vestibulum at placerat sem. Sed vitae ante eget diam ornare congue at non turpis. Integer nec odio feugiat, aliquet lacus sit amet, aliquet nulla nullam. ',
        createdBy: {
          id: 12,
          email: 'b@test.com',
          username: 'user1',
        },
        assigned: [
          {
            id: 10,
            email: 'a@test.com',
            username: 'user',
          },
          {
            id: 10,
            email: 'c@test.com',
            username: 'user',
          },
          {
            id: 10,
            email: 'r@test.com',
            username: 'user',
          },
        ],
      },
      {
        id: 18,
        meetingId: 5,
        title: 'Some meeting',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla semper enim et dui scelerisque maximus. Vestibulum at placerat sem. Sed vitae ante eget diam ornare congue at non turpis. Integer nec odio feugiat, aliquet lacus sit amet, aliquet nulla nullam. ',
        createdBy: {
          id: 12,
          email: 'b@test.com',
          username: 'user1',
        },
        assigned: [
          {
            id: 10,
            email: 'a@test.com',
            username: 'user',
          },
          {
            id: 10,
            email: 'c@test.com',
            username: 'user',
          },
          {
            id: 10,
            email: 'r@test.com',
            username: 'user',
          },
        ],
      },
    ]);
  }, 500);
  return;
  // eslint-disable-next-line
  get(getAllMeetingDeclarationsUrl(meetingId), setDeclarations, setResponse);
};

export const loadUserDeclarations = (setDeclarations: Function, setResponse?: Function) => {
  setTimeout(() => {
    setDeclarations([
      {
        id: 11,
        meetingId: 5,
        title: 'Some meeting',
        description: 'Some description',
        createdBy: {
          id: 12,
          email: 'b@test.com',
          username: 'user1',
        },
        assigned: [
          {
            id: 10,
            email: 'a@test.com',
            username: 'user',
          },
        ],
      },
      {
        id: 16,
        meetingId: 5,
        title: 'Some meeting',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla semper enim et dui scelerisque maximus. Vestibulum at placerat sem. Sed vitae ante eget diam ornare congue at non turpis. Integer nec odio feugiat, aliquet lacus sit amet, aliquet nulla nullam. ',
        createdBy: {
          id: 12,
          email: 'b@test.com',
          username: 'user1',
        },
        assigned: [
          {
            id: 10,
            email: 'a@test.com',
            username: 'user',
          },
          {
            id: 10,
            email: 'c@test.com',
            username: 'user',
          },
          {
            id: 10,
            email: 'r@test.com',
            username: 'user',
          },
        ],
      },
      {
        id: 17,
        meetingId: 5,
        title: 'Some meeting',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla semper enim et dui scelerisque maximus. Vestibulum at placerat sem. Sed vitae ante eget diam ornare congue at non turpis. Integer nec odio feugiat, aliquet lacus sit amet, aliquet nulla nullam. ',
        createdBy: {
          id: 12,
          email: 'b@test.com',
          username: 'user1',
        },
        assigned: [
          {
            id: 10,
            email: 'a@test.com',
            username: 'user',
          },
          {
            id: 10,
            email: 'c@test.com',
            username: 'user',
          },
          {
            id: 10,
            email: 'r@test.com',
            username: 'user',
          },
        ],
      },
      {
        id: 18,
        meetingId: 5,
        title: 'Some meeting',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla semper enim et dui scelerisque maximus. Vestibulum at placerat sem. Sed vitae ante eget diam ornare congue at non turpis. Integer nec odio feugiat, aliquet lacus sit amet, aliquet nulla nullam. ',
        createdBy: {
          id: 12,
          email: 'b@test.com',
          username: 'user1',
        },
        assigned: [
          {
            id: 10,
            email: 'a@test.com',
            username: 'user',
          },
          {
            id: 10,
            email: 'c@test.com',
            username: 'user',
          },
          {
            id: 10,
            email: 'r@test.com',
            username: 'user',
          },
        ],
      },
    ]);
  }, 500);
  return;
  // eslint-disable-next-line
  get(getDeclarationsUrl(), setDeclarations, setResponse);
};

export const updateDeclaration = (
  declarationId: number,
  newDeclaration: { title?: String; description: String },
  setDeclaration: Function,
  setResponse?: Function,
  onSuccess?: Function
) => {
  if (setResponse) {
    setResponse({
      isLoading: true,
      isSuccess: false,
      isFailed: false,
    });
    setTimeout(() => {
      if (onSuccess) onSuccess();
      setResponse({
        isLoading: false,
        isSuccess: true,
        isFailed: false,
      });
      setDeclaration({
        id: 12,
        meetingId: 5,
        title: newDeclaration.title,
        description: newDeclaration.description,
        createdBy: {
          id: 12,
          email: 'b@test.com',
          username: 'user1',
        },
        assigned: [
          {
            id: 10,
            email: 'a@test.com',
            username: 'user',
          },
        ],
      });
    }, 1000);
  }

  return;
  // eslint-disable-next-line
  put(
    newDeclaration,
    getDeclarationUrl(declarationId),
    setDeclaration,
    setResponse,
    true,
    'You have successfully edited the declaration',
    onSuccess
  );
};

// TO DO delete declaration
export const deleteDeclaration = (
  declarationId: number,
  setResponse?: Function,
  onSuccess?: Function
) => {
  // TO DO add delete api call after merging (del needed)
  if (setResponse) {
    setResponse({
      isLoading: true,
      isSuccess: false,
      isFailed: false,
    });
    setTimeout(() => {
      if (onSuccess) onSuccess();
      setResponse({
        isLoading: false,
        isSuccess: true,
        isFailed: false,
      });
    }, 1000);
  }
};

export const assignToDeclaration = (
  declarationId: number,
  setResponse?: Function,
  onSuccess?: Function
) => {
  if (setResponse) {
    setResponse({
      isLoading: true,
      isSuccess: false,
      isFailed: false,
    });
    setTimeout(() => {
      if (onSuccess) onSuccess();
      setResponse({
        isLoading: false,
        isSuccess: true,
        isFailed: false,
      });
    }, 1000);
  }
  return;
  // eslint-disable-next-line
  post(
    {},
    assingToDeclarationUrl(declarationId),
    () => {},
    setResponse,
    true,
    'User successfully assigned to the declaration',
    onSuccess
  );
};

export const unassignFromDeclaration = (
  declarationId: number,
  setResponse?: Function,
  onSuccess?: Function
) => {
  if (setResponse) {
    setResponse({
      isLoading: true,
      isSuccess: false,
      isFailed: false,
    });
    setTimeout(() => {
      if (onSuccess) onSuccess();
      setResponse({
        isLoading: false,
        isSuccess: true,
        isFailed: false,
      });
    }, 1000);
  }
  return;
  // eslint-disable-next-line
  post(
    {},
    unassingToDeclarationUrl(declarationId),
    () => {},
    setResponse,
    true,
    'User successfully unassigned from the declaration',
    onSuccess
  );
};
