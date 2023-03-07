//@libs
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

//@pages
const Login = lazy(() => import('./pages/Login'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const NewPass = lazy(() => import('./pages/NewPass'));

const authRoutes = [
  {
    path: '/login',
    key: 'LOGIN',
    exact: true,
    element: ({ isAuthenticated }) =>
      isAuthenticated ? <Navigate to="/home" /> : <Login />,
  },
  {
    path: '/forgot-password',
    key: 'FORGOT',
    exact: true,
    element: () => <ForgotPassword />,
  },
  {
    path: '/recover-password/:token',
    key: 'RECOVER',
    exact: true,
    element: () => <NewPass />,
  },
];

export default authRoutes;
