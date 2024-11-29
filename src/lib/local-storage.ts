export type STORAGE_KEYS = "ACCESS_TOKEN" | "APP_THEME";

/**
 * Set an item in local storage
 * @param {STORAGE_KEYS} key - The key of the item
 * @param {*} value - The value to set (will be serialized to JSON)
 */
export const setStorage = (key: STORAGE_KEYS, value: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

/**
 * Get an item from local storage
 * @param {STORAGE_KEYS} key - The key of the item to retrieve
 * @returns {*} - The parsed value from local storage or null
 */
export const getStorage = (key: STORAGE_KEYS) => {
  if (typeof window !== "undefined") {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }
  return null;
};

/**
 * Remove an item from local storage
 * @param {STORAGE_KEYS} key - The key of the item to remove
 */
export const removeStorage = (key: STORAGE_KEYS) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};
