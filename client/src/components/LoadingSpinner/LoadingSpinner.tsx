import { Box, CircularProgress } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(() => ({
  spinnerContainer: {
    minHeight: '90vh',
  },
}));

export default function LoadingSpinner(): JSX.Element {
  const classes = useStyles();
  return (
    <Box display="flex" justifyContent="center" alignItems="center" className={classes.spinnerContainer}>
      <CircularProgress />
    </Box>
  );
}
