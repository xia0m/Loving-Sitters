import { useState } from 'react';
import { Box, CssBaseline, TextField, Button, Typography } from '@mui/material';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { useHistory } from 'react-router-dom';
import DateFnsUtils from '@date-io/date-fns';

import useStyles from './useStyles';
import cover from '../../Images/Landing Cover Image.jpg';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';

export default function LandingPage(): JSX.Element {
  const { setFilters } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();
  const [city, setCity] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const history = useHistory();
  const classes = useStyles();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (city && startDate && endDate) {
      setFilters({ city, startDate, endDate });
      history.push('/listings');
    } else if (startDate === null && endDate === null) {
      updateSnackBarMessage('Please Enter Drop In/Drop Off Dates');
    } else if (startDate === null && endDate !== null) {
      updateSnackBarMessage('Please Enter Drop In Date');
    } else if (startDate !== null && endDate === null) {
      updateSnackBarMessage('Please Enter Drop Off Date');
    }
  };

  return (
    <Box display="flex" className={classes.mainContainer}>
      <CssBaseline />
      <Box flex={1} display="flex" alignItems="center" justifyContent="center">
        <Box maxWidth={650} maxHeight={575} className={classes.searchFormContainer}>
          <Typography variant="h2" className={classes.title}>
            Find the care your dog deserves
          </Typography>
          <form onSubmit={handleSubmit} className={classes.form}>
            <Typography className={classes.label}>Where</Typography>
            <TextField
              onChange={(e) => setCity(e.target.value)}
              value={city}
              variant="outlined"
              color="secondary"
              placeholder="Anywhere"
              className={classes.input}
              required
            />
            <Typography className={classes.label}>Drop In / Drop Off</Typography>
            <Box display="flex">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  autoOk
                  color="secondary"
                  variant="inline"
                  inputVariant="outlined"
                  placeholder="mm/dd/yyyy"
                  format="MM/dd/yyyy"
                  value={startDate}
                  onChange={(date) => setStartDate(date)}
                  required
                />
              </MuiPickersUtilsProvider>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  autoOk
                  color="secondary"
                  variant="inline"
                  inputVariant="outlined"
                  placeholder="mm/dd/yyyy"
                  format="MM/dd/yyyy"
                  value={endDate}
                  onChange={(date) => setEndDate(date)}
                  required
                />
              </MuiPickersUtilsProvider>
            </Box>
            <Button type="submit" variant="contained" color="primary" size="large" className={classes.button}>
              Find My Dog Sitter
            </Button>
          </form>
        </Box>
      </Box>
      <Box flex={1} className={classes.imageContainer}>
        <img src={cover} alt="Landing Page" className={classes.image} />
      </Box>
    </Box>
  );
}
