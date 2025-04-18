import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { createBrowserRouter, RouterProvider, Outlet, useLocation } from 'react-router-dom';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from 'sonner';

import App from './App.jsx';
import CreateTrip from './create-trip';
import Viewtrip from './view-trip/trip';
import Header from './components/custom/Header';
import Footer from './components/custom/Footer';
import MyTrips from './my-trips/index.jsx';
import AboutUs from './about-us/index.jsx';

// Layout component to handle conditional footer rendering
function Layout() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Toaster />
      <Outlet />
      {!isHomePage && <Footer />}
    </div>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <App /> },
      { path: '/create-trip', element: <CreateTrip /> },
      { path: '/view-trip/:tripId', element: <Viewtrip /> },
      { path: '/my-trips', element: <MyTrips /> },
      { path: '/about-us', element: <AboutUs /> }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
