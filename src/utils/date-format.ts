export function formatDate(dateStringOrTimestamp: string, withTime: boolean = true) {
    const date = new Date(dateStringOrTimestamp);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = days[date.getDay()];
    let value = day;
    if (withTime) {
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        value = `${day}, ${hours}, ${minutes}`;
    }
    return value;
}