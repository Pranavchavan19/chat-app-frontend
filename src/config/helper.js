
import moment from 'moment-timezone';

export function getSendTime(timestamp) {
  if (!timestamp) {
    return "Invalid Time";
  }

  // Parse UTC timestamp and convert to IST (Indian Standard Time)
  return moment.utc(timestamp)       // Parse as UTC
    .tz('Asia/Kolkata')               // Convert to Kolkata (IST)
    .format('h:mm A');                // Format to 12-hour format with AM/PM
}



console.log("Current Time:", getSendTime());