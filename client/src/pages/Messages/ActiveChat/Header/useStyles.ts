import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '1rem 0 0.25rem 0',
    padding: '2rem 0',
    boxShadow: `0 0 3px ${theme.palette.primary.main}`,
  },
  username: {
    margin: '0 1rem',
    color: theme.palette.primary.main,
  },
  statusText: {
    fontSize: 12,
    color: '#BFC9DB',
    letterSpacing: -0.17,
  },
  statusDot: {
    height: 8,
    width: 8,
    borderRadius: '50%',
    marginRight: 5,
    backgroundColor: '#D0DAE9',
  },
  online: {
    background: '#1CED84',
  },
}));

export default useStyles;
