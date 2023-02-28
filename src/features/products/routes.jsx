//@libs
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

//@layout
import Layout from '../../components/Layout';

//@pages
const Products = lazy(() => import('./pages/Products'));

const moduleName = 'products';

const productsRoutes = [
  {
    path: `/${moduleName}`,
    key: 'PRODUCTS',
    exact: true,
    element: ({ isAuthenticated }) =>
      isAuthenticated ? (
        <Layout>
          <Products />
        </Layout>
      ) : (
        <Navigate to="/login" />
      ),
  },
];

export default productsRoutes;
