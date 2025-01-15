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
  
import moment from 'moment-timezone';

export function getSendTime(timestamp) {
  if (!timestamp) {
    return "Invalid Time";
  }

  // Convert the UTC timestamp to Kolkata time (Indian Standard Time)
  return moment(timestamp)
    .tz('Asia/Kolkata')  // Convert to IST (Indian Standard Time)
    .format('h:mm A');   // Format time to 12-hour format with AM/PM
}


console.log("Current Time:", getSendTime());