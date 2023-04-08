/**
 * Formats a given date string or timestamp into a human-readable string, including the day of the week
 * and optionally the time.
 *
 * @param dateStringOrTimestamp - The date string or timestamp to format.
 * @param withTime - (Optional) A boolean value indicating if the time should be included in the formatted string.
 *                   Default is true.
 * @returns A formatted date string including the day of the week and, if withTime is true, the time.
 */
export function formatDate(dateStringOrTimestamp: string, withTime: boolean = true) {
    // Create a Date object from the input dateStringOrTimestamp
    const date = new Date(dateStringOrTimestamp);

    // Array of days for indexing
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
   
    // Get the day of the week from the Date object
    const day = days[date.getDay()];
    
    // If withTime is false, return only the day
    if (!withTime) {
      return day;
    }
    // Format the hours and minutes with leading zeros
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
   
    // Return the formatted date string including the day and time
    return `${day}, ${hours}:${minutes}`;
  }