import { Spinner } from 'react-bootstrap';

export type LoadingSpinnerProps = {
  acitve: Boolean;
};
const LoadingSpinner = ({ acitve }: LoadingSpinnerProps) => {
  return acitve ? (
    <Spinner animation="border" role="status" style={{ color: 'var(--purple)' }}></Spinner>
  ) : (
    <></>
  );
};

export default LoadingSpinner;
