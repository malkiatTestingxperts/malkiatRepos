/**
 * Returns a date string in dd/mm/yyyy format offset by a number of days from today.
 * @param offsetDays Number of days to offset (e.g., -1 for yesterday, 0 for today, 1 for tomorrow)
 * @returns {string} Formatted date string
 */
export function getFormattedDateOffset(offsetDays: number): string {
    const date = new Date();
    date.setDate(date.getDate() + offsetDays);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-based
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
}
