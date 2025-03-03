import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import GPDaily from '../pages/Home';
import GPStore from '../store/GP_store/Home';
import About from '../pages/About';
import Signup from '../components/forms/signup/Signup';
import Login from '../components/forms/login/Login';
import { StoreProvider } from '../context/StoreContext';
import OTPVerification from '../components/forms/login/Otp_verification';
import Verification from '../components/forms/signup/Verification';
import DiscoverStore from '../components/forms/signup/AccountSetup/DiscoverStore';
import ChooseFlower from '../components/forms/signup/AccountSetup/ChooseFlower';
import ChooseLeaves from '../components/forms/signup/AccountSetup/ChooseLeaves';
import ChooseGarlands from '../components/forms/signup/AccountSetup/ChooseGarlands';
import YourPackage from '../components/forms/signup/AccountSetup/YourPackage';
import BestFit from '../components/forms/signup/AccountSetup/BestFit';
import SetupLocation from '../components/forms/signup/AccountSetup/SetupLocation';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <GPDaily />,
      },
      {
        path: '/home',
        element: <GPDaily />,
      },
      {
        path: '/store',
        element: <GPStore />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/otp-Verification',
        element: <OTPVerification />
      },
      {
        path: '/Verification',
        element: <Verification />
      },
      {
        path: '/discover-store',
        element: <DiscoverStore />
      },
      {
        path: '/choose-flower',
        element: <ChooseFlower currentStep={1} />
      },
      {
        path: '/choose-leaves',
        element: <ChooseLeaves />
      },
      {
        path: '/choose-garlands',
        element: <ChooseGarlands />
      },
      {
        path: '/your-package',
        element: <YourPackage />
      },
      {
        path: '/best-fit',
        element: <BestFit />
      },
      {
        path: '/setup-location',
        element: <SetupLocation />
      }
    ],
  },
]);

const Router = () => {
  return (
    <StoreProvider>
      <RouterProvider router={router} />
    </StoreProvider>
  );
};

export default Router; 