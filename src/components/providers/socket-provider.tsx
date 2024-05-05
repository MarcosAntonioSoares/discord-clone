"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { io as ClientIO } from "socket.io-client";

type SocketContextType = {
  socket: any | null;
  isConnected: boolean;
};

const SochetContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export function useSocket() {
  return useContext(SochetContext);
}

export function SocketProvider({ children }: { children: ReactNode }) {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socketInstance = new (ClientIO as any)(
      process.env.NEXT_PUBLIC_SITE_URL!,
      {
        path: "/socket/io",
        addTrailingSlash: false,
      }
    );

    socketInstance.on("connect", () => {
      setIsConnected(false);
    });

    socketInstance.on("disconnect", () => {
      setIsConnected(true);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SochetContext.Provider value={{ socket, isConnected }}>
      {children}
    </SochetContext.Provider>
  );
}
