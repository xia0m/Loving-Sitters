import { ThemeProvider, Theme, StyledEngineProvider } from '@mui/material';
import { theme } from './themes/theme';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import { AuthProvider } from './context/useAuthContext';
import { SocketProvider } from './context/useSocketContext';
import { SnackBarProvider } from './context/useSnackbarContext';
import { ReactourProvider } from './context/useReactourContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import LandingPage from './pages/LandingPage/LandingPage';
import Listings from './pages/Listings/Listings';
import ProfileSettings from './pages/ProfileSettings/ProfileSettings';
import ProfileDetails from './pages/ProfileDetails/ProfileDetails';
import Messages from './pages/Messages/Messages';

import './App.css';
import Layout from './components/Layout/Layout';
import Bookings from './pages/Bookings/Bookings';
import Checkout from './pages/Checkout/Checkout';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Request from './pages/Request/Request';
import { MessageContextProvider } from './context/useMessageContext';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

const stripePromise = loadStripe(
  'pk_test_51Ite41ETXh1tPNGoqqdONIoPnTfqTTKF7AXARKRrMqmqDzL6jP0dpaD2jQgCVf1NpnId9ZHTC5cTiQZiTlLSHUU100Md0Rj9EK',
);
const CheckoutContainer = () => (
  <Elements stripe={stripePromise}>
    <Checkout />
  </Elements>
);

function App(): JSX.Element {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <SnackBarProvider>
            <AuthProvider>
              <MessageContextProvider>
                <SocketProvider>
                  <ReactourProvider>
                    <Layout>
                      <Switch>
                        <Route exact path="/" component={LandingPage} />
                        <Route exact path="/listings" component={Listings} />
                        <Route exact path="/profile/:id" component={ProfileDetails} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/signup" component={Signup} />
                        <ProtectedRoute exact path="/checkout" component={CheckoutContainer} />
                        <ProtectedRoute exact path="/bookings" component={Bookings} />
                        <ProtectedRoute exact path="/messages" component={Messages} />
                        <ProtectedRoute exact path="/messages/:conversationId" component={Messages} />
                        <ProtectedRoute exact path="/user/:path" component={ProfileSettings} />
                        <ProtectedRoute exact path="/requests" component={Request} />
                      </Switch>
                    </Layout>
                  </ReactourProvider>
                </SocketProvider>
              </MessageContextProvider>
            </AuthProvider>
          </SnackBarProvider>
        </BrowserRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
