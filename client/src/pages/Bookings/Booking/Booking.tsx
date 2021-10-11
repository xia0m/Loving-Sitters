import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import useStyles from './useStyles';
import { Request } from '../../../interface/Bookings';
import Moment from 'react-moment';
import { Button, Paper, Typography } from '@mui/material';
import AvatarDisplay from '../../../components/AvatarDisplay/AvatarDisplay';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';

interface Props {
  bookingDetails: Request | undefined;
}

export default function Bookings({ bookingDetails }: Props): JSX.Element {
  const classes = useStyles();

  if (!bookingDetails) return <></>;
  const { start, accepted, declined, receivedBy, paid } = bookingDetails;

  return (
    <>
      <CssBaseline />
      <Paper elevation={0} className={classes.root}>
        <Grid container justifyContent="space-between" className={classes.dateContainer}>
          <Typography component="span" className={classes.date}>
            <Moment date={start} interval={0} format="D MMM, YYYY" /> <Moment date={start} interval={0} format="LT" />
          </Typography>
          <SettingsIcon className={classes.settingsIcon} />
        </Grid>
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          wrap="nowrap"
          className={classes.bookingDetails}
        >
          <Grid container alignItems="center" className={classes.sitterDetailsContainer}>
            <AvatarDisplay src={receivedBy?.profilePhoto} />
            <Typography component="span" className={classes.sitterName}>
              {`${receivedBy?.firstName} ${receivedBy?.lastName}`}
            </Typography>
          </Grid>
          {!paid ? (
            <Typography color="secondary" className={classes.paidText}>
              {accepted ? 'accepted' : declined ? 'declined' : 'pending'}
            </Typography>
          ) : (
            <Typography color="primary" className={classes.paidText}>
              Paid
            </Typography>
          )}

          {!paid ? (
            <Link
              to={{
                pathname: '/checkout',
                state: {
                  bookingDetails: bookingDetails,
                },
              }}
              style={{ textDecoration: 'none' }}
              className={declined || !accepted ? classes.checkoutLink : ''}
            >
              <Button
                variant="contained"
                color="primary"
                className={classes.btnDisplay}
                disabled={declined || !accepted}
              >
                Checkout
              </Button>
            </Link>
          ) : null}
        </Grid>
      </Paper>
    </>
  );
}
