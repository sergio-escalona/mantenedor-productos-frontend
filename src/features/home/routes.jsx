//@libs
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

//@layout
import Layout from '../../components/Layout';

//@pages
const Home = lazy(() => import('./pages'));

const moduleName = 'home';

const homeRoutes = [
  {
    path: `/${moduleName}`,
    key: 'HOME',
    exact: true,
    element: ({ isAuthenticated }) =>
      isAuthenticated ? (
        <Layout>
          <Home />
        </Layout>
      ) : (
        <Navigate to="/login" />
      ),
  },
];

export default homeRoutes;
