const googleUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=621232719841-7v4dq1335o23j626us79bph9p2ji6nho.apps.googleusercontent.com&redirect_uri=${process.env.HOST}/api/auth/callback&scope=https://www.googleapis.com/auth/userinfo.email&state=fj74nx1631`;

export default googleUrl;
