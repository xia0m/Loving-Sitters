import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(() => ({
  root: {
    background: '#fff',
    padding: '0.5rem 1rem',
    border: '1px solid #bdbdbd',
    // borderRadius: '0',
    width: '100%',
    minWidth: '400px',
    marginTop: '0.5rem',
  },
  date: {
    fontWeight: 'bold',
  },
  settingsIcon: {
    color: '#bdbdbd',
    '&:hover': {
      color: '#000',
      cursor: 'pointer',
    },
  },
  dateContainer: {
    marginBottom: '0.5rem',
  },
  bookingDetails: { marginBottom: '0.5rem' },
  sitterName: {
    fontWeight: 'bold',
  },
  sitterDetailsContainer: {
    gap: '1rem',
  },
  button: {
    textTransform: 'uppercase',
  },
}));

export default useStyles;
