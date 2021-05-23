import { Container } from '@material-ui/core';
import { useAuth } from '../../context/useAuthContext';
import Navbar from '../Navbar/Navbar';

interface Props {
  children: JSX.Element[] | JSX.Element;
}

const Layout = ({ children }: Props): JSX.Element => {
  const { loggedInUser, logout } = useAuth();
  return (
    <Container maxWidth={false} style={{ padding: '0' }}>
      <Navbar user={loggedInUser} logout={logout} />
      {children}
    </Container>
  );
};

export default Layout;
