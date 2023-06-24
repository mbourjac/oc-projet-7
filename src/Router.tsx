import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { AppLayout } from './components/AppLayout/AppLayout';
import { Home, loader as homeLoader } from './pages/Home/Home';
import { Room, loader as roomLoader } from './pages/Room/Room';
import { About } from './pages/About/About';
import { NotFound } from './pages/NotFound/NotFound';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route index element={<Home />} loader={homeLoader} />
      <Route path="rooms/:id" element={<Room />} loader={roomLoader} />
      <Route path="about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export const Router = () => {
  return <RouterProvider router={router} />;
};
