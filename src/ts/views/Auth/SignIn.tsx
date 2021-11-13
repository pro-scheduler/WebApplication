import Container from 'react-bootstrap/Container';
import AuthView from './AuthView';
import GoogleButton from '../../components/common/SubmitButton/IconButton/GoogleButton';
import FacebookButton from '../../components/common/SubmitButton/IconButton/FacebookButton';
import { googleUrl, facebookUrl } from '../../auth/AuthCredentials';
import { useLocation } from 'react-router';

const SignIn = () => {
  const location = useLocation();

  const constructStateParam = () => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get('invite-link')) {
      return `t=il,v=${queryParams.get('invite-link')}`;
    }
    return `t=d,v=null`;
  };

  return (
    <Container className="my-0">
      <AuthView title="Sign In">
        <GoogleButton
          redirectTo={googleUrl.replace(':state', constructStateParam())}
          text="Sign in with Google"
          containerClassName="my-2"
        />
        <FacebookButton
          redirectTo={facebookUrl.replace(':state', constructStateParam())}
          text="Sign in with Facebook"
          containerClassName="mt-4"
        />
      </AuthView>
    </Container>
  );
};

export default SignIn;
