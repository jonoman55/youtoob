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
