import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import useStyles from './useStyles';
import { Paper } from '@mui/material';
import OrderDetails from './OrderDetails/OrderDetails';
import Payment from './Payment/Payment';
import { Profile } from '../../interface/Profile';
import { Request } from '../../interface/Bookings';

import { useLocation } from 'react-router-dom';

interface LocationState {
  bookingDetails: Request;
}

export default function Order(): JSX.Element {
  const classes = useStyles();
  const location = useLocation<LocationState>();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [checkout, setCheckout] = useState<boolean>(false);
  const [totalHours, setTotalHours] = useState<number>(0);
  const [subTotal, setSubTotal] = useState<number>(0);
  const [serviceFee, setServiceFee] = useState<number>(0);
  const { bookingDetails } = location.state;
  const [requestId, setRequestId] = useState<string>('');
  const [userProfile, setUserProfile] = useState<Profile>({
    _id: '',
    firstName: '',
    lastName: '',
    coverPhoto: '',
    profilePhoto: '',
    isDogSitter: false,
    isAvailable: false,
    availability: [''],
    price: 0,
    city: '',
    gallery: [''],
    reviews: [],
  });

  useEffect(() => {
    if (bookingDetails && bookingDetails.receivedBy) {
      setUserProfile(bookingDetails.receivedBy);
      setRequestId(bookingDetails._id);
      setStartDate(new Date(bookingDetails.start));
      setEndDate(new Date(bookingDetails.end));
    }
  }, []);

  useEffect(() => {
    if (endDate && startDate) {
      const hours = Math.abs(endDate.getTime() - startDate.getTime()) / 36e5;
      if (hours > 0) {
        setTotalHours(Math.round(hours * 100) / 100);
      }
    }
    setSubTotal(totalHours * userProfile.price);
    setServiceFee(Math.round(totalHours * userProfile.price * 3) / 100);
  }, [startDate, endDate, totalHours]);

  return (
    <>
      <CssBaseline />
      <Grid
        container
        component="main"
        className={`${classes.root}`}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item md={8} sm={10} xs={12}>
          <Paper elevation={6} className={classes.paper}>
            {checkout ? (
              <Payment
                userProfile={userProfile}
                hours={totalHours}
                requestId={requestId}
                start={startDate}
                end={endDate}
              />
            ) : (
              <OrderDetails
                userProfile={userProfile}
                startDate={startDate}
                endDate={endDate}
                totalHours={totalHours}
                subTotal={subTotal}
                serviceFee={serviceFee}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                checkout={() => setCheckout(true)}
              />
            )}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
