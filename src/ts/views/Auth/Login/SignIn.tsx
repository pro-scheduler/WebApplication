import React from 'react';
import Container from 'react-bootstrap/Container';
import AuthView from '../AuthView';
import GoogleButton from '../../../components/common/SubmitButton/IconButton/GoogleButton';
import FacebookButton from '../../../components/common/SubmitButton/IconButton/FacebookButton';

const SignIn = () => {
  return (
    <Container className="ml-5 ml-sm-auto">
      <AuthView
        title="Sign In"
        question="Don't have an account yet?"
        redirectText="Sign up now"
        redirectTo="/signup"
      >
        <GoogleButton redirectTo="/signup" text="Sign in with Google" className="my-2" />
        <FacebookButton redirectTo="/signup" text="Sign in with Facebook" className="mt-4" />
      </AuthView>
    </Container>
  );
};

export default SignIn;
