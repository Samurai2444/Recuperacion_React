import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home";
import ServicePage from "../pages/ServicePage";
import ProductPage from "../pages/ProductPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ReservationPage from "../pages/ReservationPage";
import ProfilePage from "../pages/ProfilePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      }, 
      {
        path: "/servicios",
        element: <ServicePage />,
      },
      {
        path: "/productos",
        element: <ProductPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      { 
        path: "/reserva",
        element: <ReservationPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      }
    ],
  },
]);
