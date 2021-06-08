import { FunctionComponent } from 'react';
import { AuthContext } from '../context/useAuthContext';
import { mockLoggedInUser } from './mockUser';
import { mockProfile, mockProfiles, mockFilter } from './mockProfile';

const MockUseAuthProvider: FunctionComponent = ({ children }) => {
  return (
    <AuthContext.Provider
      value={{
        sitterProfiles: mockProfiles,
        filters: mockFilter,
        loggedInUserDetails: mockProfile,
        loggedInUser: mockLoggedInUser,
        loading: true,
        errorMsg: '',
        setLoading: jest.fn(),
        setFilters: jest.fn(),
        updateLoginContext: jest.fn(),
        updateSitterProfilesContext: jest.fn(),
        updateLoggedInUserDetails: jest.fn(),
        logout: jest.fn(),
        getUserProfileDetails: jest.fn(),
        fetchSitterProfiles: jest.fn(),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default MockUseAuthProvider;
