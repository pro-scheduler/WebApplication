export const googleUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=621232719841-7v4dq1335o23j626us79bph9p2ji6nho.apps.googleusercontent.com&redirect_uri=${process.env.REACT_APP_AUTH_HOST}/api/auth/callback&scope=https://www.googleapis.com/auth/userinfo.email&state=fj74nx1631`;
export const facebookUrl = `https://www.facebook.com/v10.0/dialog/oauth?client_id=281743826814306&redirect_uri=${process.env.REACT_APP_AUTH_HOST}/api/auth/facebook&state=1hf4t5niww3r1&scope=email`;

