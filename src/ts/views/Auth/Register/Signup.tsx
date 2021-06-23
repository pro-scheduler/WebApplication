import React from 'react';
import Container from 'react-bootstrap/Container';
import AuthView from '../AuthView';
import GoogleButton from '../../../components/common/SubmitButton/IconButton/GoogleButton';
import FacebookButton from '../../../components/common/SubmitButton/IconButton/FacebookButton';

const SignUp = () => {
  return (
    <Container className="my-0">
      <AuthView
        title="Create an account"
        question="Already have an account?"
        redirectText="Sign in"
        redirectTo="/signin"
      >
        <GoogleButton redirectTo="/signin" text="Sign up with Google" className="my-2" />
        <FacebookButton redirectTo="/signin" text="Sign up with Facebook" className="mt-4" />
      </AuthView>
    </Container>
  );
};

export default SignUp;
