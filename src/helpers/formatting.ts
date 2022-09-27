/**
 * Capitalize the first letter of a string
 * @param {string} text String to Capitalize
 * @returns {string} Capitalized string
 */
export const capitalizeFirstLetter = (text: string): string => {
    return text.charAt(0).toUpperCase() + text.slice(1);
};

/**
 * Lowercase the first letter of a string
 * @param {string} text String to Lowercase
 * @returns {string} Lowercased string
 */
export const lowercaseFirstLetter = (text: string): string => {
    return text.charAt(0).toLowerCase() + text.slice(1);
};

/**
 * Format Video Title
 * @param {string} title Video Title 
 * @returns Formatted Video Title
 */
export const formatVideoTitle = (title: string): string => {
    if (title.length > 60) {
        const slice = title?.slice(0, 60);
        if (slice.includes(' ')) {
            const split = slice?.split(' ');
            const formatted = decodeURIComponent(split
                .map((i) => i.trim())
                .slice(0, -1)
                .join(' ')
                .replace(/[^a-zA-Z ]/g, '')
                .trim()
            );
            console.log('formatted title:', formatted);
            return formatted;
        }
        return slice;
    }
    return title;
};

/**
 * Format Subscriber Count
 * @param {string} subscriberCount Subscriber Count
 * @returns Formatted Subscriber Count
 */
export const formatSubscriberCount = (subscriberCount: string) => {
    return parseInt(subscriberCount).toLocaleString('en-US');
};

/**
 * Format Count
 * @param {string} count Count
 * @returns Formatted Count
 */
export const formatCount = (count: string) => {
    return parseInt(count).toLocaleString();
};
