import { RiDashboardLine } from 'react-icons/ri';

const routes = [
  {
    name: 'Inicio',
    icon: RiDashboardLine,
    path: '/home',
    iconName: 'home',
    subRoutes: [],
  },
  {
    name: 'Productos',
    icon: RiDashboardLine,
    path: '/products',
    iconName: 'products',
    subRoutes: [],
  },
  {
    name: 'Categorías',
    icon: RiDashboardLine,
    path: '/Category',
    iconName: 'categories',
    subRoutes: [],
  },
  {
    name: 'Usuarios',
    icon: RiDashboardLine,
    path: '/users',
    iconName: 'users',
    subRoutes: [],
  },
];

export const reportRoutes = [];

export default routes;
