// import { createContext, useContext, useState } from "react";

// const ChatContext = createContext()

// export const ChatProvider = ({children}) => {

//     const [roomId , setRoomId] = useState("");
//     const [currentUser ,setCurrentUser] = useState("");
//     const [connected , setConnected] = useState(false)
//    return <ChatContext.Provider 
//     value={{roomId ,currentUser , connected , setRoomId ,setCurrentUser , setConnected}}
//    >{children}
//    </ChatContext.Provider>
// }

// const useChatContext =  () => useContext(ChatContext);
// export default useChatContext;



import { createContext, useContext, useState, useEffect } from "react";

// Create a context for the chat
const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  // Initialize state for roomId, currentUser, and connected status
  const [roomId, setRoomId] = useState(localStorage.getItem('roomId') || ""); // If a previous room ID exists in localStorage, use it
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('currentUser') || ""); // If a previous user exists in localStorage, use it
  const [connected, setConnected] = useState(false);

  // Use useEffect to synchronize roomId and currentUser with localStorage
  useEffect(() => {
    if (roomId) localStorage.setItem('roomId', roomId);
    if (currentUser) localStorage.setItem('currentUser', currentUser);
  }, [roomId, currentUser]);

  return (
    <ChatContext.Provider
      value={{
        roomId,
        currentUser,
        connected,
        setRoomId,
        setCurrentUser,
        setConnected,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// Custom hook to use chat context
const useChatContext = () => useContext(ChatContext);
export default useChatContext;
