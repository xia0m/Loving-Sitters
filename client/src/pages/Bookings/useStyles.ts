import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(() => ({
  root: {},
  bookings: {},
  paper: {
    padding: '2rem 1rem',
    margin: '1rem 0',
    border: 'none',
  },
  currentBookings: {
    maxHeight: '60vh',
    overflowY: 'auto',
  },
  pastBookings: {
    marginTop: '1rem',
  },
}));

export default useStyles;
