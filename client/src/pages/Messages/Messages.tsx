import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CircularProgress';
import useStyles from './useStyles';
import { useAuth } from '../../context/useAuthContext';
import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SideBar from './Sidebar/Sidebar';
import ActiveChat from './ActiveChat/ActiveChat';
import { useMessages } from '../../context/useMessageContext';
import { sendMessage } from '../../helpers/APICalls/messages';
import { useSocket } from '../../context/useSocketContext';

interface RouteParams {
  conversationId: string;
}

export default function Messages(): JSX.Element {
  const classes = useStyles();
  const history = useHistory();
  const { loggedInUser, loggedInUserDetails } = useAuth();
  const { conversations, activeConversation, addMessage, loading, setActiveConversation } = useMessages();
  const { conversationId } = useParams<RouteParams>();
  const { socket } = useSocket();

  const [error, setError] = useState<string>('');

  const handleSendMessage = (text: string) => {
    if (activeConversation) {
      sendMessage(activeConversation, text).then((res) => {
        if (res.success) {
          addMessage(res.success.message);
          const recipient = conversations.find((convo) => convo.conversationId === activeConversation)?.recipient;
          socket?.emit('new-message', {
            ...res.success.message,
            receiver: recipient?._id,
            conversationId: activeConversation,
          });
        } else if (res.error) setError(res.error.message);
      });
    }
  };

  useEffect(() => {
    if (conversationId) setActiveConversation(conversationId);
  }, [conversationId]);

  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    history.push('/login');
    // loading for a split seconds until history.push works
    return <CircularProgress />;
  }

  return (
    <Grid container component="main" justifyContent="center" className={`${classes.root} ${classes.dashboard}`}>
      <CssBaseline />
      <Grid item className={classes.drawerWrapper} xs={12} sm={10} md={4} xl={2}>
        {loggedInUserDetails && <SideBar userProfile={loggedInUserDetails} conversations={conversations} />}
      </Grid>
      <Grid item xs={12} sm={10} md={8} className={classes.activeConvoContainer}>
        {activeConversation && (
          <ActiveChat
            conversation={conversations.find((convo) => convo.conversationId === activeConversation)}
            handleSendMessage={handleSendMessage}
          />
        )}
      </Grid>
    </Grid>
  );
}
