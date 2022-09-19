/**
 * Get Item
 * @param {string} value Storage Item Value
 * @returns {any} Storage Item
 */
export const getItem = (value: string): string | null => {
    return JSON.parse(localStorage.getItem(value) as string);
};

/**
 * Set Item
 * @param key Storage Item Key
 * @param value Storage Item Value
 * @returns {string} Storage Value
 */
export const setItem = (key: string, value: string): string => {
    return JSON.stringify(localStorage.setItem(key, value));
};
