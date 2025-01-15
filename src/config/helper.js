// export function timeAgo(date) {
//     const now = new Date();
//     const past = new Date(date);
//     const secondsAgo = Math.floor((now - past) / 1000);
  
//     if (secondsAgo < 60) return `${secondsAgo} seconds ago`;
//     const minutesAgo = Math.floor(secondsAgo / 60);
//     if (minutesAgo < 60) return `${minutesAgo} minutes ago`;
//     const hoursAgo = Math.floor(minutesAgo / 60);
//     if (hoursAgo < 24) return `${hoursAgo} hours ago`;
//     const daysAgo = Math.floor(hoursAgo / 24);
//     if (daysAgo < 30) return `${daysAgo} days ago`;
//     const monthsAgo = Math.floor(daysAgo / 30);
//     if (monthsAgo < 12) return `${monthsAgo} months ago`;
//     const yearsAgo = Math.floor(monthsAgo / 12);
//     return `${yearsAgo} years ago`;
//   }
  

//   console.log(timeAgo("2025-01-08T06:15:26Z")); 


// export function timeAgo() {
//   const options = { 
//     hour: '2-digit', 
//     minute: '2-digit', 
//     hour12: true  // This option ensures AM/PM format
//   };

//   // Get the current local time formatted in 12-hour format
//   const time = new Date().toLocaleTimeString([], options);
//   return time;
// }

// // Example usage in your component
// console.log(timeAgo()); // e.g., "12:38 PM"


// export function getSendTime(timestamp) {
//   const options = { 
//     hour: '2-digit', 
//     minute: '2-digit', 
//     hour12: true // This option ensures AM/PM format
//   };

//   // Convert the timestamp to a Date object and format it
//   const time = new Date(timestamp).toLocaleTimeString([], options);
//   return time;
// }

// console.log(getSendTime());

// export function getSendTime(timestamp) {
//   const options = { 
//     hour: '2-digit', 
//     minute: '2-digit', 
//     hour12: true, // AM/PM format
//     timeZone: 'UTC' // Set the time zone if necessary (e.g., UTC or a specific time zone)
//   };

//   // Convert the timestamp to a Date object and format it
//   const time = new Date(timestamp).toLocaleTimeString([], options);
//   return time;
// }

// console.log(getSendTime(new Date().toISOString()));  // Using current time for testing



// export function getSendTime(timestamp = new Date()) {
//   const options = { 
//     hour: '2-digit', 
//     minute: '2-digit', 
//     hour12: true, // AM/PM format
//     timeZone: 'Asia/Kolkata' // Replace with your desired time zone, e.g., 'Asia/Kolkata' for Indian Standard Time
//   };

//   // Convert the timestamp to a Date object and format it
//   const time = new Date(timestamp).toLocaleTimeString('en-US', options);
//   return time;
// }







export function getSendTime(timestamp) {
  if (!timestamp || isNaN(timestamp)) {
    console.error("Invalid timestamp:", timestamp);
    return "Invalid Time"; // Return if timestamp is invalid
  }

  const options = { 
    hour: '2-digit', 
    minute: '2-digit', 
    hour12: true // 12-hour format (AM/PM)
  };

  // Ensure correct formatting
  const time = new Date(timestamp).toLocaleTimeString([], options);
  return time;
}


// Example usage
console.log("Current Time:", getSendTime()); // For the current time

