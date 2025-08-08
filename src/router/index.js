import { createBrowserRouter } from 'react-router-dom';
import Login from '@/pages/Login';
import Layout from '@/pages/Layout';
import AuthRoute from '@/components/AuthRoute';
//import Home from '@/pages/Home';
//import Article from '@/pages/Article';
//import Publish from '@/pages/Publish';
import {lazy, Suspense} from 'react';

const Home = lazy(() => import('@/pages/Home'));
const Article = lazy(() => import('@/pages/Article'));
const Publish = lazy(() => import('@/pages/Publish'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthRoute><Layout /></AuthRoute>,
    children: [
      {
        index: true,
        element: <Suspense fallback={<div>Loading...</div>}>
          <Home />
        </Suspense>,
      },
      {
        path: '/article',
        element: <Suspense fallback={<div>Loading...</div>}>
          <Article />
        </Suspense>,
      },
      {
        path: '/publish',
        element: <Suspense fallback={<div>Loading...</div>}>
          <Publish />
        </Suspense>,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

export default router;