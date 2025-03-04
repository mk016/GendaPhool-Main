import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import GPDaily from '../pages/Home';
import GPStore from '../pages/store/GP_store/Home';
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
import SearchPage from '../pages/store/GP_store/pages/SearchPage';
import Wallet from '../features/Wallet/wallet';
import PaymentOptions from '../features/Wallet/PaymentOptions';
import ManageMySubscription from '../features/Wallet/Subscription/ManageMySubscription';
import MorePage from '../pages/More/home';
import Refer from '../pages/Refer/Refer';
import Profile from '../pages/More/Account&Perferenecs/Profile/Profile';
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