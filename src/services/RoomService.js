import { httpClient } from "../config/AxiosHelper"

// export const createRoomApi = async (roomDetail) => {
//   const response = await httpClient.post(`/api/v1/rooms`,roomDetail,{
//     headers:{
//        "content-Type" : "text/plain" ,
//     },
//   })
//   return response.data;
// };

// export const joinChatApi = async (roomId) => {
      
//        const response = await httpClient.get(`/api/v1/rooms/${roomId}`);
//        return response.data;
// };

// export const  getMessagess = async (roomId , size=100 , page=0) => {
//        const response = await httpClient.get(`api/v1/rooms/${roomId}/messages?size=${size}&page=${page}`);
//        return response.data;

// } 




export const createRoomApi = async (roomDetail) => {
  try {
    const response = await httpClient.post("/api/v1/rooms", roomDetail, {
      headers: {
        "content-Type" : "text/plain" ,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in creating room:", error.response ? error.response.data : error.message);
    throw error; // Optionally, you can rethrow the error
  }
};


export const joinChatApi = async (roomId) => {
  try {
    const response = await httpClient.get(`/api/v1/rooms/${roomId}`);
    return response.data;
  } catch (error) {
    console.error("Error in joinChatApi:", error);
    throw error.response?.data || "Failed to join chat.";
  }
};

export const getMessagess = async (roomId, size = 100, page = 0) => {
  try {
    const response = await httpClient.get(
      `/api/v1/rooms/${roomId}/messages?size=${size}&page=${page}`
    );
    return response.data;
  } catch (error) {
    console.error("Error in getMessagess:", error);
    throw error.response?.data || "Failed to retrieve messages.";
  }
};
