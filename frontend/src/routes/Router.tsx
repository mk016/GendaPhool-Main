import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import GPDaily from '../pages/Home';
import GPStore from '../pages/store/GP_store/Home';
import Signup from '../components/Customer/forms/signup/Signup';
import Login from '../components/Customer/forms/login/Login';
import { StoreProvider } from '../context/StoreContext';
import OTPVerification from '../components/Customer/forms/login/Otp_verification';
import Verification from '../components/Customer/forms/signup/Verification';
import DiscoverStore from '../components/Customer/forms/signup/AccountSetup/DiscoverStore';
import ChooseFlower from '../components/Customer/forms/signup/AccountSetup/ChooseFlower';
import ChooseLeaves from '../components/Customer/forms/signup/AccountSetup/ChooseLeaves';
import ChooseGarlands from '../components/Customer/forms/signup/AccountSetup/ChooseGarlands';
import YourPackage from '../components/Customer/forms/signup/AccountSetup/YourPackage';
import BestFit from '../components/Customer/forms/signup/AccountSetup/BestFit';
import SetupLocation from '../components/Customer/forms/signup/AccountSetup/SetupLocation';
import SearchPage from '../pages/store/GP_store/pages/SearchPage';
import Wallet from '../features/Wallet/wallet';
import PaymentOptions from '../features/Wallet/PaymentOptions';
import ManageMySubscription from '../features/Wallet/Subscription/ManageMySubscription';
import MorePage from '../pages/More/home';
import Refer from '../pages/Refer/Refer';
import Profile from '../pages/More/Account&Perferenecs/Profile/Profile';
import Landing from '../pages/Landing';
import Home2 from '../pages/home2';
import Location from '../features/location/location';
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
      },
      {
        path: '/store/search',
        element: <SearchPage />
      },
      {
        path: '/wallet',
        element: <Wallet />
      },
      {
        path: '/payment-options',
        element: <PaymentOptions />
      },
      {
        path: '/manage-my-subscription',
        element: <ManageMySubscription />
      },
      {
        path: '/more',
        element: <MorePage />
      },
      {
        path: '/refer',
        element: <Refer />
      },
      {
        path: '/account',
        element: <Profile />
      },
      {
        path: '/landing',
        element: <Landing />
      },
      {
        path: '/setup-location',
        element: <SetupLocation />
      },
      {
        path: '/home2',
        element: <Home2 />
      },
      {
        path: '/location',
        element: <Location />
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