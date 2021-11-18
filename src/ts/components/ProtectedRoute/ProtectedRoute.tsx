import { useEffect } from 'react';
import { FunctionComponent } from 'react';
import { Route, useHistory } from 'react-router-dom';

export type ProtectedRouteType = {
  path: string;
  isNotLoggedIn: boolean;
};
const ProtectedRoute: FunctionComponent<ProtectedRouteType> = ({
  children,
  path,
  isNotLoggedIn,
}) => {
  const history = useHistory();
  useEffect(() => {
    if (isNotLoggedIn) {
      history.push({
        pathname: '/',
        state: { from: path },
      });
    }
  }, [isNotLoggedIn, history, path]);

  return <Route path={path}>{children}</Route>;
};

export default ProtectedRoute;
