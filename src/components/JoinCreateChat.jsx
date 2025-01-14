

import React, { useState } from "react";
import chatIcon from "../assets/chat.png";
import toast from "react-hot-toast";
import { createRoomApi, joinChatApi } from "../services/RoomService";
import useChatContext from "../context/ChatContext";
import { useNavigate } from "react-router";

function JoinCreateChat() {
  const [detail, setDetail] = useState({
    roomId: "",
    userName: "",
  });

  const { setRoomId, setCurrentUser, setConnected } = useChatContext();
  const navigate = useNavigate();

  function handleFormInputChange(event) {
    setDetail({
      ...detail,
      [event.target.name]: event.target.value,
    });
  }

  function validateForm() {
    if (detail.roomId === "" || detail.userName === "") {
      toast.error("Invalid Input !! ");
      return false;
    }
    return true;
  }

  async function joinChat() {
    if (validateForm()) {
      try {
        const room = await joinChatApi(detail.roomId);
        toast.success("Joined successfully!");
        setCurrentUser(detail.userName);
        setRoomId(room.roomId);
        setConnected(true);
        navigate("/chat");
      } catch (error) {
        if (error.status === 400) {
          toast.error(error.response.data);
        } else {
          toast.error("Error in joining room!");
        }
        console.error(error);
      }
    }
  }



  async function createRoom() {
    if (validateForm()) {
      try {
        const response = await createRoomApi(detail.roomId); // Pass only the roomId as a string
        toast.success("Room created successfully!");
        setCurrentUser(detail.userName);
        setRoomId(response.roomId);
        setConnected(true);
        navigate("/chat");
      } catch (error) {
        if (error.status === 400) {
          toast.error("Room already exists!");
        } else {
          console.error("Error in creating room", error);
          toast.error("Error creating room!");
        }
      }
    }
  }
  


  return (
    <div className="min-h-screen flex items-center justify-center p-4">
    <div className="w-full max-w-md p-6 bg-white dark:bg-gray-900 shadow-lg rounded-md">
      <div className="mb-6">
        <img src={chatIcon} alt="Chat Icon" className="w-20 sm:w-24 mx-auto" />
      </div>
      <h1 className="text-lg sm:text-2xl font-semibold text-center mb-4">
        Join Room / Create Room
      </h1>
      {/* Name Input */}
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm sm:text-base font-medium mb-2"
        >
          Your Name
        </label>
        <input
          type="text"
          id="name"
          name="userName"
          value={detail.userName}
          onChange={handleFormInputChange}
          placeholder="Enter your name"
          className="w-full px-4 py-2 border rounded-full dark:bg-gray-600 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
        />
      </div>
      {/* Room ID Input */}
      <div className="mb-6">
        <label
          htmlFor="roomId"
          className="block text-sm sm:text-base font-medium mb-2"
        >
          Room ID / New Room ID
        </label>
        <input
          type="text"
          id="roomId"
          name="roomId"
          value={detail.roomId}
          onChange={handleFormInputChange}
          placeholder="Enter the room ID"
          className="w-full px-4 py-2 border rounded-full dark:bg-gray-600 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
        />
      </div>
      {/* Buttons */}
      <div className="flex justify-center gap-4">
        <button
          onClick={joinChat}
          className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-700 text-sm sm:text-base"
        >
          Join Room
        </button>
        <button
          onClick={createRoom}
          className="px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-700 text-sm sm:text-base"
        >
          Create Room
        </button>
      </div>
    </div>
  </div>
  
  );
}

export default JoinCreateChat;




// import React, { useState } from "react";
// import chatIcon from "../assets/chat.png";
// import toast from "react-hot-toast";
// import { createRoomApi, joinChatApi } from "../services/RoomService";
// import useChatContext from "../context/ChatContext";
// import { useNavigate } from "react-router";

// function JoinCreateChat() {
//   const [detail, setDetail] = useState({
//     roomId: "",
//     userName: "",
//   });

//   const { setRoomId, setCurrentUser, setConnected } = useChatContext();
//   const navigate = useNavigate();

//   function handleFormInputChange(event) {
//     setDetail({
//       ...detail,
//       [event.target.name]: event.target.value,
//     });
//   }

//   function validateForm() {
//     if (detail.roomId === "" || detail.userName === "") {
//       toast.error("Invalid Input !! ");
//       return false;
//     }
//     return true;
//   }

//   async function joinChat() {
//     if (validateForm()) {
//       try {
//         const room = await joinChatApi(detail.roomId);
//         toast.success("Joined successfully!");
//         setCurrentUser(detail.userName);
//         setRoomId(room.roomId);
//         setConnected(true);
//         navigate("/chat");
//       } catch (error) {
//         if (error.status === 400) {
//           toast.error(error.response.data);
//         } else {
//           toast.error("Error in joining room!");
//         }
//         console.error(error);
//       }
//     }
//   }

//   async function createRoom() {
//     if (validateForm()) {
//       try {
//         // Call the createRoom API with roomId
//         const response = await createRoomApi(detail.roomId); // Pass only the roomId as a string
//         toast.success("Room created successfully!");
//         setCurrentUser(detail.userName);
//         setRoomId(response.roomId);
//         setConnected(true);
//         navigate("/chat");
//       } catch (error) {
//         if (error.response && error.response.status === 400) {
//           toast.error("Room already exists!");
//         } else {
//           console.error("Error in creating room", error);
//           toast.error("Error creating room!");
//         }
//       }
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4">
//       <div className="w-full max-w-md p-6 bg-white dark:bg-gray-900 shadow-lg rounded-md">
//         <div className="mb-6">
//           <img src={chatIcon} alt="Chat Icon" className="w-20 sm:w-24 mx-auto" />
//         </div>
//         <h1 className="text-lg sm:text-2xl font-semibold text-center mb-4">
//           Join Room / Create Room
//         </h1>
//         {/* Name Input */}
//         <div className="mb-4">
//           <label
//             htmlFor="name"
//             className="block text-sm sm:text-base font-medium mb-2"
//           >
//             Your Name
//           </label>
//           <input
//             type="text"
//             id="name"
//             name="userName"
//             value={detail.userName}
//             onChange={handleFormInputChange}
//             placeholder="Enter your name"
//             className="w-full px-4 py-2 border rounded-full dark:bg-gray-600 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
//           />
//         </div>
//         {/* Room ID Input */}
//         <div className="mb-6">
//           <label
//             htmlFor="roomId"
//             className="block text-sm sm:text-base font-medium mb-2"
//           >
//             Room ID / New Room ID
//           </label>
//           <input
//             type="text"
//             id="roomId"
//             name="roomId"
//             value={detail.roomId}
//             onChange={handleFormInputChange}
//             placeholder="Enter the room ID"
//             className="w-full px-4 py-2 border rounded-full dark:bg-gray-600 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
//           />
//         </div>
//         {/* Buttons */}
//         <div className="flex justify-center gap-4">
//           <button
//             onClick={joinChat}
//             className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-700 text-sm sm:text-base"
//           >
//             Join Room
//           </button>
//           <button
//             onClick={createRoom}
//             className="px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-700 text-sm sm:text-base"
//           >
//             Create Room
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default JoinCreateChat;
