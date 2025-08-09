import {
  createBrowserRouter,
  RouterProvider as RRDRouterProvider,
} from 'react-router-dom';
import { routes } from '../router/routes';

const router = createBrowserRouter(routes);

export const RouterProvider = () => {
  return <RRDRouterProvider router={router} />;
};
