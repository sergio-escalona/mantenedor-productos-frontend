import Home from './icons/Home';
import Products from './icons/Products';
import Categories from './icons/Categories';
import Users from './icons/Users';

export default function Icon({ name, size = 30, color = '#9e6240' }) {
  let icons;
  icons = {
    home: <Home color={color} size={size} />,
    products: <Products color={color} size={size} />,
    categories: <Categories color={color} size={size} />,
    users: <Users color={color} size={size} />,
  };
  return icons[name] || null;
}
