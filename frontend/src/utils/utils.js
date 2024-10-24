import CacheStorage from "@/utils/cacheStorage";

export const isObject = (value) => {
  return value && typeof value === "object" && value.constructor === Object;
};

export const isAuthenticated = () => {
  console.log("access_token", CacheStorage.getItem("access_token"));
  return CacheStorage.getItem("access_token");
};

export const isNotNullOrUndefined = (val) => {
  return val !== undefined && val !== null;
};
