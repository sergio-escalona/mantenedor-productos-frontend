import { Navigate } from 'react-router-dom';
import homeRoutes from '../features/home/routes';
import categoriesRoutes from '../features/categories/routes';
import productsRoutes from '../features/products/routes';
import usersRouter from '../features/users/routes';

const generalsRoutes = [
  {
    path: '/',
    key: 'INDEX',
    exact: true,
    element: ({ isAuthenticated }) => (
      <Navigate to={`/${isAuthenticated ? 'home' : 'login'}`} />
    ),
  },
];

const routes = [
  ...generalsRoutes,
  ...homeRoutes,
  ...categoriesRoutes,
  ...productsRoutes,
  ...usersRouter,
];

export default routes;