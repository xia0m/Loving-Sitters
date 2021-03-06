import { Container } from '@mui/material';
import { useAuth } from '../../context/useAuthContext';
import Navbar from '../Navbar/Navbar';
import ReactourFAB from '../ReactourFAB/ReactourFAB';

interface Props {
  children: JSX.Element[] | JSX.Element;
}

const Layout = ({ children }: Props): JSX.Element => {
  const { loggedInUser, loggedInUserDetails, logout } = useAuth();
  return (
    <Container maxWidth={false} style={{ padding: '0' }}>
      <Navbar user={loggedInUser} userProfile={loggedInUserDetails} logout={logout} />
      {children}
      {loggedInUser && <ReactourFAB />}
    </Container>
  );
};

export default Layout;
