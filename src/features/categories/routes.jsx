//@libs
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

//@layout
import Layout from '../../components/Layout';

//@pages
const Categories = lazy(() => import('./pages/Categories'));

const moduleName = 'category';

const categoryRoutes = [
  {
    path: `/${moduleName}`,
    key: 'CATEGORIES',
    exact: true,
    element: ({ isAuthenticated }) =>
      isAuthenticated ? (
        <Layout>
          <Categories />
        </Layout>
      ) : (
        <Navigate to="/login" />
      ),
  },
];

export default categoryRoutes;
