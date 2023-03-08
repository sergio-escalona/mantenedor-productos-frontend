//@libs
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

//@layout
import Layout from '../../components/Layout';

//@pages
const ChangePassword = lazy(() => import('./pages/ChangePassword'));

const moduleName = 'change-password';

const userRoutes = [
  {
    path: `/${moduleName}`,
    key: 'CHANGEPASSWORD',
    exact: true,
    element: ({ isAuthenticated }) =>
      isAuthenticated ? (
        <Layout>
          <ChangePassword />
        </Layout>
      ) : (
        <Navigate to="/login" />
      ),
  },
];

export default userRoutes;
