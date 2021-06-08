import { useState, useContext, useEffect, createContext, FunctionComponent, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

import { useAuth } from '../context/useAuthContext';
import { useMessages } from './useMessageContext';

const ENDPOINT = 'ws://localhost:3001';

interface ISocketContext {
  socket: Socket | undefined;
  initSocket: () => void;
  onlineUsers: string[];
  usersTyping: string[]; // conversation Ids of user typing
}

export const SocketContext = createContext<ISocketContext>({
  socket: undefined,
  initSocket: () => null,
  onlineUsers: [],
  usersTyping: [],
});

export const SocketProvider: FunctionComponent = ({ children }): JSX.Element => {
  const { loggedInUser, loggedInUserDetails } = useAuth();
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const { addNewMessage } = useMessages();
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [usersTyping, setUsersTyping] = useState<string[]>([]);

  const initSocket = useCallback(() => {
    console.log('Trying to connect');
    setSocket(
      io(ENDPOINT, {
        withCredentials: true,
        transports: ['websocket'],
      }),
    );
  }, []);

  useEffect(() => {
    if (loggedInUser) {
      initSocket();
    }
  }, [loggedInUser]);

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        socket.emit('go-online', loggedInUserDetails?._id);

        socket.on('add-online-user', (id) => {
          if (!onlineUsers.includes(id)) {
            if (id !== null) {
              setOnlineUsers([...onlineUsers, id]);
            }
          }
        });

        socket.on('remove-offline-user', (id) => {
          if (onlineUsers.includes(id)) {
            const temp = onlineUsers.filter((user) => user !== id);
            setOnlineUsers(temp);
          }
        });

        socket.on('new-message', (data) => {
          addNewMessage(data);
        });

        socket.on('user-typing', (conversationId) => {
          setUsersTyping((usersTyping) => [...usersTyping, conversationId]);
        });

        socket.on('user-stop-typing', (conversationId) => {
          setUsersTyping((usersTyping) => usersTyping.filter((convo) => convo !== conversationId));
        });
      });
    }
    return () => {
      socket?.off('new-message');
    };
  }, [socket, loggedInUserDetails]);

  return (
    <SocketContext.Provider value={{ socket, initSocket, onlineUsers, usersTyping }}>{children}</SocketContext.Provider>
  );
};

export function useSocket(): ISocketContext {
  return useContext(SocketContext);
}
