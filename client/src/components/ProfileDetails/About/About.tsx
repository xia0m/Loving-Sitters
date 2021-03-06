import { useState } from 'react';
import { Avatar, Box, Fade, Grid, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Pagination from '@mui/material/Pagination';

import { Profile } from '../../../interface/Profile';
import Gallery from '../../Gallery/Gallery';
import { useAuth } from '../../../context/useAuthContext';
import useStyles from './useStyles';
import SitterReview from '../Review/Review';
import CreateReview from '../CreateReview/CreateReview';

export interface Props {
  sitter: Profile;
}

export default function About({ sitter }: Props): JSX.Element {
  const { loggedInUser } = useAuth();
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 5;
  const noOfPages = Math.ceil(sitter.reviews.length / itemsPerPage);
  const classes = useStyles();

  return (
    <Fade in={true}>
      <Paper elevation={6} className={classes.detailsContainer}>
        <Box className={classes.imageContainer}>
          <img src={sitter.coverPhoto} alt="Profile" className={classes.coverImage} />
          <Avatar alt="User" src={sitter.profilePhoto} className={classes.avatar} />
        </Box>
        <Box textAlign="center" className={classes.aboutContainer}>
          <Typography variant="h4" className={classes.name}>
            {`${sitter.firstName} ${sitter.lastName}`}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Loving Pet Sitter
          </Typography>
          <Typography variant="body1" color="textSecondary" className={classes.location}>
            <LocationOnIcon color="primary" />
            {sitter.city}
          </Typography>
          <Grid container justifyContent="center" alignItems="center">
            <Typography className={classes.dayAvailable}>Availability:</Typography>
            {sitter.availability.length === 0 && <Typography className={classes.dayAvailable}>N/A</Typography>}
            {sitter.availability.map((day) => (
              <Typography key={day} className={classes.dayAvailable}>
                {day}
              </Typography>
            ))}
          </Grid>
          <Box textAlign="left">
            <Typography variant="h5" className={classes.aboutTitle}>
              About Me
            </Typography>
            <Typography variant="body1" className={classes.aboutDescription}>
              {sitter.description}
            </Typography>
          </Box>
          {sitter.gallery.length > 0 && (
            <>
              <Typography component="div" variant="h5" align="left" className={classes.aboutTitle}>
                Gallery
              </Typography>
              <Gallery gallery={sitter.gallery} />
            </>
          )}
        </Box>
        <Box className={classes.reviewsContainer}>
          <Box>
            <Typography variant="h5" className={classes.reviewMainTitle}>
              Ratings and Reviews ({sitter.reviews.length})
            </Typography>
          </Box>

          {loggedInUser ? (
            <CreateReview sitterId={sitter._id} />
          ) : (
            <Typography align="right" variant="body1" className={classes.signInTitle}>
              Please &nbsp;
              <Link to="/login">Sign In</Link>
              &nbsp; to create a Review
            </Typography>
          )}

          <Box>
            {[...sitter.reviews]
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((review) => (
                <SitterReview review={review} key={review._id} />
              ))}
          </Box>
          <Box display="flex" justifyContent="center" className={classes.paginationContainer}>
            <Pagination
              count={noOfPages}
              page={page}
              onChange={(event, value) => setPage(value)}
              defaultPage={1}
              siblingCount={1}
              shape="rounded"
              size="large"
              color="primary"
              showFirstButton
              showLastButton
            />
          </Box>
        </Box>
      </Paper>
    </Fade>
  );
}
