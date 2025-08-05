import { createBrowserRouter } from 'react-router-dom';
import Login from '@/pages/Login';
import Layout from '@/pages/Layout';
import AuthRoute from '@/components/AuthRoute';
import Home from '@/pages/Home';
import Article from '@/pages/Article';
import Publish from '@/pages/Publish';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthRoute><Layout /></AuthRoute>,
    children: [
      {
        index: true,
        element: <AuthRoute><Home /></AuthRoute>,
      },
      {
        path: '/article',
        element: <AuthRoute><Article /></AuthRoute>,
      },
      {
        path: '/publish',
        element: <AuthRoute><Publish /></AuthRoute>,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

export default router;