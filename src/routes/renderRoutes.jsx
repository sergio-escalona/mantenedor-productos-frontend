import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Loading } from '../components/UI';
import { useAuthState, useAuthDispatch } from '../context';
import { getAuthenticatedUser, logout } from '../context/actions';
import routes from './routes';

function RenderRoutes() {
  const { isAuthenticated, loading } = useAuthState();
  const dispatch = useAuthDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      getAuthenticatedUser(dispatch);
    } else {
      logout(dispatch);
    }
  }, [isAuthenticated]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Routes>
          {routes.map(item => (
            <Route
              key={`router-${item.key}`}
              path={item.path}
              element={<item.element isAuthenticated={isAuthenticated} />}
            />
          ))}
        </Routes>
      )}
    </>
  );
}

export default RenderRoutes;
