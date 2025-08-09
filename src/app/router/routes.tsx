import { Home } from '../../pages/Home/Home';
import { Profile } from '../../pages/Profile/Profile';

export const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
];
