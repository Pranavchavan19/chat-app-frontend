
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


import React, { useRef, useState, useEffect } from 'react';
import { MdAttachFile, MdSend } from "react-icons/md";
import { useNavigate } from 'react-router';
import useChatContext from '../context/ChatContext';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import toast from 'react-hot-toast';
import { baseURL } from '../config/AxiosHelper';
import { getMessagess } from '../services/RoomService';
import { timeAgo } from '../config/helper';

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
  const [input, setInput] = useState('');
  const [imagePreview, setImagePreview] = useState(null); // State to hold image preview
  const inputRef = useRef(null);
  const chatBoxRef = useRef(null);
  const [stompClient, setStompClient] = useState(null);
  const fileInputRef = useRef(null);  // Reference to the file input

  useEffect(() => {
    async function loadMessages() {
      try {
        const messages = await getMessagess(roomId);
        setMessages(messages);
      } catch (error) {}
    }
    if (connected) {
      loadMessages();
    }
  }, [connected, roomId]);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scroll({
        top: chatBoxRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  useEffect(() => {
    const connectWebSocket = () => {
      const sock = new SockJS(`${baseURL}/chat`);
      const client = Stomp.over(sock);

      client.connect({}, () => {
        setStompClient(client);
        toast.success("connected");

        client.subscribe(`/topic/room/${roomId}`, (message) => {
          const newMessage = JSON.parse(message.body);
          setMessages((prev) => [...prev, newMessage]);
        });
      });
    };

    if (connected) {
      connectWebSocket();
    }
  }, [roomId, connected]);

  const sendMessage = () => {
    if (stompClient && connected) {
      let messageContent = input;

      // If the input is an image preview, set the message content as the image URL
      if (imagePreview) {
        messageContent = imagePreview;  // Use the image URL as the message content
      }

      if (messageContent.trim()) {
        const message = {
          sender: currentUser,
          content: messageContent,
          roomId: roomId,
        };

        stompClient.send(
          `/app/sendMessage/${roomId}`,
          {},
          JSON.stringify(message)
        );
        setInput(''); // Clear input
        setImagePreview(null); // Clear image preview after sending the message
      }
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];  // Get the selected file
    if (file) {
      setInput(file.name);  // Set the file name in the input box

      // Display image preview if it's an image
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);  // Set the image preview URL
        };
        reader.readAsDataURL(file);  // Read the image file
      }
    }
  };

  const handleLogout = () => {
    stompClient.disconnect();
    setConnected(false);
    setRoomId('');
    setCurrentUser('');
    navigate('/');
  };

  return (
    <div className="relative">
      {/* Header for Laptop */}
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

      {/* Chat Box */}
      <main
        ref={chatBoxRef}
        className="py-20 px-10 w-2/3 dark:bg-slate-600 mx-auto h-screen overflow-auto hidden sm:block"
      >
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
                  className="h-10 w-10"
                  src={"https://avatar.iran.liara.run/public/43"}
                  alt=""
                />
                <div className="flex flex-col gap-1">
                  <p className="text-sm sm:text-base font-bold">
                    {message.sender}
                  </p>
                  {/* If message is an image URL, display it as an image */}
                  {message.content.startsWith('data:image') ? (
                    <img
                      src={message.content}
                      alt="Sent Image"
                      className="w-32 h-32 object-contain rounded-lg"
                    />
                  ) : (
                    <p className="text-sm sm:text-base">{message.content}</p>
                  )}
                  <p className="text-xs sm:text-sm text-gray-400">
                    {timeAgo(message.timeStamp)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* Input and Send Section */}
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
              {/* Attach File Button */}
              <button
                onClick={() => fileInputRef.current.click()}
                className="dark:bg-purple-600 h-8 w-8 flex justify-center items-center rounded-full hover:bg-purple-700 transition-all"
              >
                <MdAttachFile size={20} />
              </button>

              {/* Hidden File Input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />

              {/* Send Button */}
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

      {/* Display Image Preview */}
      {imagePreview && (
        <div className="fixed bottom-16 left-0 right-0 flex justify-center">
          <img
            src={imagePreview}
            alt="Selected File"
            className="w-48 h-48 object-contain rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default ChatPage;
