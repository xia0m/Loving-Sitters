import { Badge } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { Profile } from '../../interface/Profile';
import useStyles from './useStyles';

interface Props {
  loggedIn?: boolean;
  online?: boolean;
  offline?: boolean;
  profile?: Profile | null | undefined;
  src?: string;
}

const AvatarDisplay = ({ profile, src, online, offline }: Props): JSX.Element => {
  const classes = useStyles();
  return (
    <Badge
      classes={{ badge: `${classes.badge}  ${online && classes.online}  ${offline && classes.offline}` }}
      variant="dot"
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      overlap="circular"
    >
      <Avatar alt="Profile Image" src={profile?.profilePhoto || src} />
    </Badge>
  );
  return <Avatar alt="Profile Image" src={profile?.profilePhoto || src} />;
};

export default AvatarDisplay;
