import { Spinner } from 'react-bootstrap';

export type LoadingSpinnerProps = {
  active: Boolean;
};
const LoadingSpinner = ({ active }: LoadingSpinnerProps) => {
  return active ? (
    <Spinner animation="border" role="status" style={{ color: 'var(--primary)' }} />
  ) : (
    <></>
  );
};

export default LoadingSpinner;
