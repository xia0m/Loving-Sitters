import { Badge } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { Profile } from '../../interface/Profile';
import useStyles from './useStyles';

interface Props {
  loggedIn?: boolean;
  online?: boolean;
  profile?: Profile | null | undefined;
  src?: string;
}

const AvatarDisplay = ({ profile, src, online }: Props): JSX.Element => {
  const classes = useStyles();
  if (online)
    return (
      <Badge
        classes={{ badge: `${classes.badge} ${online && classes.online}` }}
        variant="dot"
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        overlap="circle"
      >
        <Avatar alt="Profile Image" src={profile?.profilePhoto || src} />
      </Badge>
    );
  return <Avatar alt="Profile Image" src={profile?.profilePhoto || src} />;
};

export default AvatarDisplay;
