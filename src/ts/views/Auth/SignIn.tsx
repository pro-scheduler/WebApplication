import Container from 'react-bootstrap/Container';
import AuthView from './AuthView';
import GoogleButton from '../../components/common/SubmitButton/IconButton/GoogleButton';
import FacebookButton from '../../components/common/SubmitButton/IconButton/FacebookButton';
import { googleUrl, facebookUrl } from '../../auth/AuthCredentials';

const SignIn = () => {
  return (
    <Container className="my-0">
      <AuthView title="Sign In">
        <GoogleButton redirectTo={googleUrl} text="Sign in with Google" containerClassName="my-2" />
        <FacebookButton
          redirectTo={facebookUrl}
          text="Sign in with Facebook"
          containerClassName="mt-4"
        />
      </AuthView>
    </Container>
  );
};

export default SignIn;
