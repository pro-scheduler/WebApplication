import React from 'react';
import Container from 'react-bootstrap/Container';
import AuthView from '../AuthView';
import GoogleButton from '../../../components/common/SubmitButton/IconButton/GoogleButton';
import FacebookButton from '../../../components/common/SubmitButton/IconButton/FacebookButton';
import googleUrl from '../../../auth/AuthCredentials';

const SignIn = () => {
  return (
    <Container className="my-0">
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
