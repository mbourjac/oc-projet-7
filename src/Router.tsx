import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout/AppLayout';
import { Home } from './pages/Home/Home';
import { About } from './pages/About/About';
import { NotFound } from './pages/NotFound/NotFound';
import { Room } from './pages/Room/Room';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route index element={<Home />} />
      <Route path="rooms/:id" element={<Room />} />
      <Route path="about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export const Router = () => {
  return <RouterProvider router={router} />;
};
