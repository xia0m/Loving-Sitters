import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    overflowY: 'auto',
  },
  displayDate: {
    textAlign: 'center',
    margin: '0.5rem 0',
    fontWeight: 'bold',
    borderBottom: '1px dotted #000',
  },
}));

export default useStyles;
