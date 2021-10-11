import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    padding: '0 2rem',
    background: '#fff',
    zIndex: 2,
    [theme.breakpoints.down('lg')]: {
      padding: '0 1rem',
    },
    [theme.breakpoints.down('md')]: {
      position: 'absolute',
      top: '0',
    },
  },
  active: {
    left: '0',
  },
  notActive: {
    left: '110%',
  },
  chatContainer: {
    maxHeight: 'calc( 100vh - 280px )',
    width: '100%',
    flexGrow: 1,
    overflow: 'auto',
  },
}));

export default useStyles;
