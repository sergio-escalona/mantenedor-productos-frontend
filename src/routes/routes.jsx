//@libs
import { Navigate } from 'react-router-dom';

//@routes
import authRoutes from '../features/auth/routes';
import homeRoutes from '../features/home/routes';
import categoriesRoutes from '../features/categories/routes';
import productsRoutes from '../features/products/routes';
import usersRouter from '../features/users/routes';
import userRouter from '../features/user/routes';

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
  ...authRoutes,
  ...homeRoutes,
  ...categoriesRoutes,
  ...productsRoutes,
  ...usersRouter,
  ...userRouter,
];

export default routes;
