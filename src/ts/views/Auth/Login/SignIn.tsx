import React from 'react';
import Container from 'react-bootstrap/Container';
import AuthView from '../AuthView';
import GoogleButton from '../../../components/common/SubmitButton/IconButton/GoogleButton';
import FacebookButton from '../../../components/common/SubmitButton/IconButton/FacebookButton';

const googleUrl =
  'https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=621232719841-7v4dq1335o23j626us79bph9p2ji6nho.apps.googleusercontent.com&redirect_uri=http://localhost:8080/api/auth/callback&scope=https://www.googleapis.com/auth/userinfo.email&state=fj74nx1631';

const SignIn = () => {
  return (
    <Container className="ml-5 ml-sm-auto">
      <AuthView
        title="Sign In"
        question="Don't have an account yet?"
        redirectText="Sign up now"
        redirectTo="/signup"
      >
        <GoogleButton redirectTo={googleUrl} text="Sign in with Google" className="my-2" />
        <FacebookButton redirectTo="/signup" text="Sign in with Facebook" className="mt-4" />
      </AuthView>
    </Container>
  );
};

export default SignIn;
