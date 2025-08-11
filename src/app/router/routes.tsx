import { Home } from '../../pages/Home/Home';
import { Profile } from '../../pages/Profile/Profile';
import { MainLayout } from '../../components/layout/MainLayout';
import { SinglePost } from '../../pages/SinglePost/SinglePost';
import { Favorites } from '../../pages/Favorites/Favorites';

export const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'favorites',
        element: <Favorites />,
      },
      {
        path: 'posts/:id',
        element: <SinglePost />,
      },
    ],
  },
];
