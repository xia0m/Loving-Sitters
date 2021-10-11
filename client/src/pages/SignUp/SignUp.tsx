import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { FormikHelpers } from 'formik';
import Typography from '@mui/material/Typography';
import useStyles from './useStyles';
import register from '../../helpers/APICalls/register';
import SignUpForm from './SignUpForm/SignUpForm';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

export default function Register(): JSX.Element {
  const classes = useStyles();
  const { updateLoginContext, getUserProfileDetails } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  const handleSubmit = (
    { firstName, lastName, email, password }: { firstName: string; lastName: string; email: string; password: string },
    { setSubmitting }: FormikHelpers<{ firstName: string; lastName: string; email: string; password: string }>,
  ) => {
    register(firstName, lastName, email, password).then((data) => {
      if (data.error) {
        console.error({ error: data.error.message });
        setSubmitting(false);
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        getUserProfileDetails(data.success.user.profile);
        updateLoginContext(data.success);
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });

        setSubmitting(false);
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} elevation={6} component={Paper} square>
        <Box className={classes.authWrapper}>
          <Box width="100%" maxWidth={450} p={3} alignSelf="center">
            <Grid container>
              <Grid item xs>
                <Typography className={classes.welcome} component="h1" variant="h5">
                  Sign up
                </Typography>
              </Grid>
            </Grid>
            <SignUpForm handleSubmit={handleSubmit} />
            <Grid className={classes.signupLinkContainer}>
              <Typography className={classes.linkText}>{'Have an account?'}</Typography>
              <Link to="/login" className={classes.signupLink}>
                <Button variant="text" className={classes.signupBtn}>
                  Login
                </Button>
              </Link>
            </Grid>
          </Box>
          <Box p={1} alignSelf="center" />
        </Box>
      </Grid>
    </Grid>
  );
}
