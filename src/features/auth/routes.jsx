//@libs
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

//@pages
const Login = lazy(() => import('./pages/Login'));

const authRoutes = [
  {
    path: '/login',
    key: 'LOGIN',
    exact: true,
    element: ({ isAuthenticated }) =>
      isAuthenticated ? <Navigate to="/home" /> : <Login />,
  },
];

export default authRoutes;
