import { Fab } from '@mui/material';
import { LiveHelp } from '@mui/icons-material';
import useStyles from './useStyles';

import { useReactour } from '../../context/useReactourContext';

export default function ReactourFAB(): JSX.Element {
  const classes = useStyles();
  const { openTour } = useReactour();
  return (
    <Fab color="secondary" className={classes.fab} onClick={openTour}>
      <LiveHelp className={classes.iconBtn} />
    </Fab>
  );
}
