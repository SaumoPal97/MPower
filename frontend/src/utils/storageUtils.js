import CacheStorage from "@/utils/cacheStorage";

export const clearLocalStorage = () => {
  CacheStorage.clear();
};

export const setLocalStorage = (key, value) => {
  CacheStorage.setItem(key, value);
};
