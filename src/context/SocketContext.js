import { createContext, useContext } from "react";

const Socket = createContext();

export const SocketContext = ({ children, socket }) => {
  return <Socket.Provider value={socket}>{children}</Socket.Provider>;
};

export const useSocket = () => useContext(Socket);
