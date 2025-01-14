
// import React, { useEffect, useRef, useState } from "react";
// import { MdAttachFile, MdSend } from "react-icons/md";
// import useChatContext from "../context/ChatContext";
// import { useNavigate } from "react-router";
// import SockJS from "sockjs-client";
// import { Stomp } from "@stomp/stompjs";
// import toast from "react-hot-toast";
// import { baseURL } from "../config/AxiosHelper";
// import { getMessagess } from "../services/RoomService";
// import { timeAgo } from "../config/helper";

// const ChatPage = () => {
//   const {
//     roomId,
//     currentUser,
//     connected,
//     setConnected,
//     setRoomId,
//     setCurrentUser,
//   } = useChatContext();

//   const navigate = useNavigate();
//   useEffect(() => {
//     if (!connected) {
//       navigate("/");
//     }
//   }, [connected, roomId, currentUser]);

//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const inputRef = useRef(null);
//   const chatBoxRef = useRef(null);
//   const [stompClient, setStompClient] = useState(null);

//   useEffect(() => {
//     async function loadMessages() {
//       try {
//         const messages = await getMessagess(roomId);
//         setMessages(messages);
//       } catch (error) {}
//     }
//     if (connected) {
//       loadMessages();
//     }
//   }, []);

//   useEffect(() => {
//     if (chatBoxRef.current) {
//       chatBoxRef.current.scroll({
//         top: chatBoxRef.current.scrollHeight,
//         behavior: "smooth",
//       });
//     }
//   }, [messages]);

//   useEffect(() => {
//     const connectWebSocket = () => {
//       const sock = new SockJS(`${baseURL}/chat`);
//       const client = Stomp.over(sock);

//       client.connect({}, () => {
//         setStompClient(client);
//         toast.success("connected");

//         client.subscribe(`/topic/room/${roomId}`, (message) => {
//           const newMessage = JSON.parse(message.body);
//           setMessages((prev) => [...prev, newMessage]);
//         });
//       });
//     };

//     if (connected) {
//       connectWebSocket();
//     }
//   }, [roomId]);

//   const sendMessage = async () => {
//     if (stompClient && connected && input.trim()) {
//       const message = {
//         sender: currentUser,
//         content: input,
//         roomId: roomId,
//       };

//       stompClient.send(
//         `/app/sendMessage/${roomId}`,
//         {},
//         JSON.stringify(message)
//       );
//       setInput("");
//     }
//   };

//   function handleLogout() {
//     stompClient.disconnect();
//     setConnected(false);
//     setRoomId("");
//     setCurrentUser("");
//     navigate("/");
//   }

//   return (
//     <div className="relative">
//       {/* Header for Laptop (Visible on larger screens) */}
//       <header className="dark:border-gray-700 fixed w-full dark:bg-gray-900 py-5 shadow flex justify-between items-center px-10 hidden sm:flex">
//         <div>
//           <h1 className="text-xl sm:text-2xl font-semibold">
//             Room: <span>{roomId}</span>
//           </h1>
//         </div>
//         <div>
//           <h1 className="text-xl sm:text-2xl font-semibold">
//             User: <span>{currentUser}</span>
//           </h1>
//         </div>
//         <div>
//           <button
//             onClick={handleLogout}
//             className="dark:bg-red-500 dark:hover:bg-red-700 px-3 py-2 rounded-full text-sm sm:text-base"
//           >
//             Leave Room
//           </button>
//         </div>
//       </header>

//       {/* Header for Mobile (Visible on small screens) */}
//       <header className="dark:border-gray-700 fixed w-full dark:bg-gray-900 py-5 shadow flex justify-between items-center px-4 sm:hidden">
//         <div>
//           <h1 className="text-sm sm:text-base font-semibold">
//             Room: <span>{roomId}</span>
//           </h1>
//         </div>
//         <div>
//           <h1 className="text-sm sm:text-base font-semibold">
//             User: <span>{currentUser}</span>
//           </h1>
//         </div>
//         <div>
//           <button
//             onClick={handleLogout}
//             className="dark:bg-red-500 dark:hover:bg-red-700 px-3 py-2 rounded-full text-xs sm:text-sm"
//           >
//             Leave Room
//           </button>
//         </div>
//       </header>

//       {/* Chat Box for Laptop */}
//       <main
//         ref={chatBoxRef}
//         className="py-20 px-10 w-2/3 dark:bg-slate-600 mx-auto h-screen overflow-auto hidden sm:block"
//       >
//         {messages.map((message, index) => (
//           <div
//             key={index}
//             className={`flex ${
//               message.sender === currentUser ? "justify-end" : "justify-start"
//             }`}
//           >
//             <div
//               className={`my-2 ${
//                 message.sender === currentUser ? "bg-green-800" : "bg-gray-800"
//               } p-2 max-w-xs rounded`}
//             >
//               <div className="flex flex-row gap-2">
//                 <img
//                   className="h-10 w-10"
//                   src={"https://avatar.iran.liara.run/public/43"}
//                   alt=""
//                 />
//                 <div className="flex flex-col gap-1">
//                   <p className="text-sm sm:text-base font-bold">
//                     {message.sender}
//                   </p>
//                   <p className="text-sm sm:text-base">{message.content}</p>
//                   <p className="text-xs sm:text-sm text-gray-400">
//                     {timeAgo(message.timeStamp)}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </main>

//       {/* Chat Box for Mobile */}
//       <main
//         ref={chatBoxRef}
//         className="py-16 px-4 w-full dark:bg-slate-600 mx-auto h-screen overflow-auto sm:hidden"
//       >
//         {messages.map((message, index) => (
//           <div
//             key={index}
//             className={`flex ${
//               message.sender === currentUser ? "justify-end" : "justify-start"
//             }`}
//           >
//             <div
//               className={`my-2 ${
//                 message.sender === currentUser ? "bg-green-800" : "bg-gray-800"
//               } p-2 max-w-xs rounded`}
//             >
//               <div className="flex flex-row gap-2">
//                 <img
//                   className="h-8 w-8"
//                   src={"https://avatar.iran.liara.run/public/43"}
//                   alt=""
//                 />
//                 <div className="flex flex-col gap-1">
//                   <p className="text-xs sm:text-sm font-bold">{message.sender}</p>
//                   <p className="text-xs sm:text-sm">{message.content}</p>
//                   <p className="text-xs sm:text-sm text-gray-400">
//                     {timeAgo(message.timeStamp)}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </main>


// <div className="fixed bottom-0 left-0 w-full z-10 flex justify-center">
//   <div className="w-full sm:w-3/4 lg:w-2/4 px-4 py-2">
//     <div className="flex items-center justify-between rounded-full w-full">
//       <input
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         onKeyDown={(e) => {
//           if (e.key === "Enter") {
//             sendMessage();
//           }
//         }}
//         type="text"
//         placeholder="Type your message here..."
//         className="w-full dark:border-gray-600 dark:bg-pink-800 px-3 py-2 rounded-full focus:outline-none text-sm sm:text-base"
//       />
//       <div className="flex gap-2 ml-2">
//         <button className="dark:bg-purple-600 h-8 w-8 flex justify-center items-center rounded-full hover:bg-purple-700 transition-all">
//           <MdAttachFile size={20} />
//         </button>
//         <button
//           onClick={sendMessage}
//           className="dark:bg-green-600 h-8 w-8 flex justify-center items-center rounded-full hover:bg-green-700 transition-all"
//         >
//           <MdSend size={20} />
//         </button>
//       </div>
//     </div>
//   </div>
// </div>


//     </div>
//   );
// };

// export default ChatPage;





// import React, { useEffect, useRef, useState } from "react";
// import { MdAttachFile, MdSend } from "react-icons/md";
// import useChatContext from "../context/ChatContext";
// import { useNavigate } from "react-router";
// import SockJS from "sockjs-client";
// import { Stomp } from "@stomp/stompjs";
// import toast from "react-hot-toast";
// import { baseURL } from "../config/AxiosHelper";
// import { getMessagess } from "../services/RoomService";
// import { timeAgo } from "../config/helper";

// const ChatPage = () => {
//   const {
//     roomId,
//     currentUser,
//     connected,
//     setConnected,
//     setRoomId,
//     setCurrentUser,
//   } = useChatContext();

//   const navigate = useNavigate();
//   useEffect(() => {
//     if (!connected) {
//       navigate("/");
//     }
//   }, [connected, roomId, currentUser]);

//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const inputRef = useRef(null);
//   const chatBoxRef = useRef(null);
//   const [stompClient, setStompClient] = useState(null);

//   // Load messages when connected
//   useEffect(() => {
//     async function loadMessages() {
//       try {
//         const messages = await getMessagess(roomId);
//         setMessages(messages);
//       } catch (error) {
//         console.log("Error loading messages:", error);
//       }
//     }

//     if (connected) {
//       loadMessages();
//     }
//   }, [roomId, connected]);

//   // Scroll to the bottom of the chat whenever messages change
//   useEffect(() => {
//     if (chatBoxRef.current) {
//       chatBoxRef.current.scroll({
//         top: chatBoxRef.current.scrollHeight,
//         behavior: "smooth",
//       });
//     }
//   }, [messages]);

//   // Connect to WebSocket server
//   useEffect(() => {
//     const connectWebSocket = () => {
//       const sock = new SockJS(`${baseURL}/chat`);
//       const client = Stomp.over(sock);

//       client.connect({}, () => {
//         setStompClient(client);
//         toast.success("Connected");

//         // Subscribe to receive messages from the room
//         client.subscribe(`/topic/room/${roomId}`, (message) => {
//           const newMessage = JSON.parse(message.body);
//           setMessages((prevMessages) => [...prevMessages, newMessage]);
//         });
//       });
//     };

//     if (connected) {
//       connectWebSocket();
//     }
//   }, [roomId, connected]);

//   // Send message function
//   const sendMessage = async () => {
//     if (stompClient && connected && input.trim()) {
//       const message = {
//         sender: currentUser,
//         content: input,
//         roomId: roomId,
//         timeStamp: Date.now(), // Add a timestamp for sorting and display
//       };

//       // Immediately update the UI with the new message
//       setMessages((prevMessages) => [...prevMessages, message]);

//       // Send the message to the backend via WebSocket
//       stompClient.send(
//         `/app/sendMessage/${roomId}`,
//         {},
//         JSON.stringify(message)
//       );

//       // Clear the input field
//       setInput("");
//     }
//   };

//   // Handle logout (disconnect WebSocket and clear user data)
//   function handleLogout() {
//     stompClient.disconnect();
//     setConnected(false);
//     setRoomId("");
//     setCurrentUser("");
//     navigate("/");
//   }

//   return (
//     <div className="relative">
//       {/* Header for Laptop (Visible on larger screens) */}
//       <header className="dark:border-gray-700 fixed w-full dark:bg-gray-900 py-5 shadow flex justify-between items-center px-10 hidden sm:flex">
//         <div>
//           <h1 className="text-xl sm:text-2xl font-semibold">
//             Room: <span>{roomId}</span>
//           </h1>
//         </div>
//         <div>
//           <h1 className="text-xl sm:text-2xl font-semibold">
//             User: <span>{currentUser}</span>
//           </h1>
//         </div>
//         <div>
//           <button
//             onClick={handleLogout}
//             className="dark:bg-red-500 dark:hover:bg-red-700 px-3 py-2 rounded-full text-sm sm:text-base"
//           >
//             Leave Room
//           </button>
//         </div>
//       </header>

//       {/* Header for Mobile (Visible on small screens) */}
//       <header className="dark:border-gray-700 fixed w-full dark:bg-gray-900 py-5 shadow flex justify-between items-center px-4 sm:hidden">
//         <div>
//           <h1 className="text-sm sm:text-base font-semibold">
//             Room: <span>{roomId}</span>
//           </h1>
//         </div>
//         <div>
//           <h1 className="text-sm sm:text-base font-semibold">
//             User: <span>{currentUser}</span>
//           </h1>
//         </div>
//         <div>
//           <button
//             onClick={handleLogout}
//             className="dark:bg-red-500 dark:hover:bg-red-700 px-3 py-2 rounded-full text-xs sm:text-sm"
//           >
//             Leave Room
//           </button>
//         </div>
//       </header>

//       {/* Chat Box for Laptop */}
//       <main
//         ref={chatBoxRef}
//         className="py-20 px-10 w-2/3 dark:bg-slate-600 mx-auto h-screen overflow-auto hidden sm:block"
//       >
//         {messages.map((message, index) => (
//           <div
//             key={index}
//             className={`flex ${
//               message.sender === currentUser ? "justify-end" : "justify-start"
//             }`}
//           >
//             <div
//               className={`my-2 ${
//                 message.sender === currentUser ? "bg-green-800" : "bg-gray-800"
//               } p-2 max-w-xs rounded`}
//             >
//               <div className="flex flex-row gap-2">
//                 <img
//                   className="h-10 w-10"
//                   src={"https://avatar.iran.liara.run/public/43"}
//                   alt=""
//                 />
//                 <div className="flex flex-col gap-1">
//                   <p className="text-sm sm:text-base font-bold">
//                     {message.sender}
//                   </p>
//                   <p className="text-sm sm:text-base">{message.content}</p>
//                   <p className="text-xs sm:text-sm text-gray-400">
//                     {timeAgo(message.timeStamp)}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </main>

//       {/* Chat Box for Mobile */}
//       <main
//         ref={chatBoxRef}
//         className="py-16 px-4 w-full dark:bg-slate-600 mx-auto h-screen overflow-auto sm:hidden"
//       >
//         {messages.map((message, index) => (
//           <div
//             key={index}
//             className={`flex ${
//               message.sender === currentUser ? "justify-end" : "justify-start"
//             }`}
//           >
//             <div
//               className={`my-2 ${
//                 message.sender === currentUser ? "bg-green-800" : "bg-gray-800"
//               } p-2 max-w-xs rounded`}
//             >
//               <div className="flex flex-row gap-2">
//                 <img
//                   className="h-8 w-8"
//                   src={"https://avatar.iran.liara.run/public/43"}
//                   alt=""
//                 />
//                 <div className="flex flex-col gap-1">
//                   <p className="text-xs sm:text-sm font-bold">{message.sender}</p>
//                   <p className="text-xs sm:text-sm">{message.content}</p>
//                   <p className="text-xs sm:text-sm text-gray-400">
//                     {timeAgo(message.timeStamp)}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </main>

//       {/* Input for message */}
//       <div className="fixed bottom-0 left-0 w-full z-10 flex justify-center">
//         <div className="w-full sm:w-3/4 lg:w-2/4 px-4 py-2">
//           <div className="flex items-center justify-between rounded-full w-full">
//             <input
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") {
//                   sendMessage();
//                 }
//               }}
//               type="text"
//               placeholder="Type your message here..."
//               className="w-full dark:border-gray-600 dark:bg-pink-800 px-3 py-2 rounded-full focus:outline-none text-sm sm:text-base"
//             />
//             <div className="flex gap-2 ml-2">
//               <button className="dark:bg-purple-600 h-8 w-8 flex justify-center items-center rounded-full hover:bg-purple-700 transition-all">
//                 <MdAttachFile size={20} />
//               </button>
//               <button
//                 onClick={sendMessage}
//                 className="dark:bg-green-600 h-8 w-8 flex justify-center items-center rounded-full hover:bg-green-700 transition-all"
//               >
//                 <MdSend size={20} />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatPage;













import React, { useEffect, useRef, useState } from "react";
import { MdAttachFile, MdSend } from "react-icons/md";
import useChatContext from "../context/ChatContext";
import { useNavigate } from "react-router";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import toast from "react-hot-toast";
import { baseURL } from "../config/AxiosHelper";
import { getMessagess } from "../services/RoomService";
import { timeAgo } from "../config/helper";

const ChatPage = () => {
  const {
    roomId,
    currentUser,
    connected,
    setConnected,
    setRoomId,
    setCurrentUser,
  } = useChatContext();

  const navigate = useNavigate();
  useEffect(() => {
    if (!connected) {
      navigate("/");
    }
  }, [connected, roomId, currentUser]);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const chatBoxRef = useRef(null);
  const [stompClient, setStompClient] = useState(null);

  // Connect WebSocket when the component mounts
  useEffect(() => {
    const connectWebSocket = () => {
      const sock = new SockJS(`${baseURL}/chat`);
      const client = Stomp.over(sock);

      client.connect({}, () => {
        setStompClient(client);
        toast.success("Connected");

        // Subscribe to room messages
        client.subscribe(`/topic/room/${roomId}`, (message) => {
          const newMessage = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        // Fetch initial messages once the WebSocket is connected
        async function loadMessages() {
          try {
            const initialMessages = await getMessagess(roomId);
            setMessages(initialMessages);
          } catch (error) {
            console.log("Error loading messages:", error);
          }
        }

        loadMessages();
      });
    };

    if (connected) {
      connectWebSocket();
    }

    // Cleanup on component unmount
    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, [roomId, connected, stompClient]);

  // Scroll to bottom of chat when new messages arrive
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scroll({
        top: chatBoxRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  // Send message function
  const sendMessage = async () => {
    if (stompClient && connected && input.trim()) {
      const message = {
        sender: currentUser,
        content: input,
        roomId: roomId,
        timeStamp: Date.now(), // Add timestamp to messages for proper sorting and display
      };

      // Immediately update the UI with the new message
      setMessages((prevMessages) => [...prevMessages, message]);

      // Send the message via WebSocket to the backend
      stompClient.send(`/app/sendMessage/${roomId}`, {}, JSON.stringify(message));

      // Clear the input field
      setInput("");
    }
  };

  // Handle logout (disconnect WebSocket and clear user data)
  function handleLogout() {
    stompClient.disconnect();
    setConnected(false);
    setRoomId("");
    setCurrentUser("");
    navigate("/");
  }

  return (
    <div className="relative">
      <header className="dark:border-gray-700 fixed w-full dark:bg-gray-900 py-5 shadow flex justify-between items-center px-10 hidden sm:flex">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold">
            Room: <span>{roomId}</span>
          </h1>
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold">
            User: <span>{currentUser}</span>
          </h1>
        </div>
        <div>
          <button
            onClick={handleLogout}
            className="dark:bg-red-500 dark:hover:bg-red-700 px-3 py-2 rounded-full text-sm sm:text-base"
          >
            Leave Room
          </button>
        </div>
      </header>

      {/* Mobile Chat Layout */}
      <main ref={chatBoxRef} className="py-16 px-4 w-full dark:bg-slate-600 mx-auto h-screen overflow-auto sm:hidden">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === currentUser ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`my-2 ${
                message.sender === currentUser ? "bg-green-800" : "bg-gray-800"
              } p-2 max-w-xs rounded`}
            >
              <div className="flex flex-row gap-2">
                <img
                  className="h-8 w-8"
                  src={"https://avatar.iran.liara.run/public/43"}
                  alt=""
                />
                <div className="flex flex-col gap-1">
                  <p className="text-xs sm:text-sm font-bold">{message.sender}</p>
                  <p className="text-xs sm:text-sm">{message.content}</p>
                  <p className="text-xs sm:text-sm text-gray-400">
                    {timeAgo(message.timeStamp)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* Chat Input Section */}
      <div className="fixed bottom-0 left-0 w-full z-10 flex justify-center">
        <div className="w-full sm:w-3/4 lg:w-2/4 px-4 py-2">
          <div className="flex items-center justify-between rounded-full w-full">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
              type="text"
              placeholder="Type your message here..."
              className="w-full dark:border-gray-600 dark:bg-pink-800 px-3 py-2 rounded-full focus:outline-none text-sm sm:text-base"
            />
            <div className="flex gap-2 ml-2">
              <button className="dark:bg-purple-600 h-8 w-8 flex justify-center items-center rounded-full hover:bg-purple-700 transition-all">
                <MdAttachFile size={20} />
              </button>
              <button
                onClick={sendMessage}
                className="dark:bg-green-600 h-8 w-8 flex justify-center items-center rounded-full hover:bg-green-700 transition-all"
              >
                <MdSend size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
