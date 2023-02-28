//@libs
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

//@layout
import Layout from '../../components/Layout';

//@pages
const Users = lazy(() => import('./pages/Users'));

const moduleName = 'users';

const usersRoutes = [
  {
    path: `/${moduleName}`,
    key: 'USERS',
    exact: true,
    element: ({ isAuthenticated }) =>
      isAuthenticated ? (
        <Layout>
          <Users />
        </Layout>
      ) : (
        <Navigate to="/login" />
      ),
  },
];

export default usersRoutes;
