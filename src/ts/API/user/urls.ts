export const getUsersUrl = () => `${process.env.REACT_APP_API_URL}users`;

export const getUserUrl = (userId: number) => getUsersUrl() + `/${userId}`;

export const getCurrentUserUrl = () => `${getUsersUrl()}/me`;

export const getSignOutUrl = () => `${process.env.REACT_APP_API_URL}auth/logout`;
