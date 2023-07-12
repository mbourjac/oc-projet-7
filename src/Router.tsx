import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { AppLayout } from './components/AppLayout/AppLayout';
import { Home, loader as homeLoader } from './pages/Home/Home';
import { Rooms } from './pages/Rooms/Rooms';
import { Room, loader as roomLoader } from './pages/Room/Room';
import { About } from './pages/About/About';
import { Error } from './pages/Error/Error';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<AppLayout />}
      errorElement={
        <AppLayout>
          <Error />
        </AppLayout>
      }
    >
      <Route index element={<Home />} loader={homeLoader} />
      <Route path="rooms" element={<Rooms />} />
      <Route
        path="rooms/:id"
        element={<Room />}
        loader={roomLoader}
        errorElement={<Error />}
      />
      <Route path="about" element={<About />} />
    </Route>
  )
);

export const Router = () => {
  return <RouterProvider router={router} />;
};
