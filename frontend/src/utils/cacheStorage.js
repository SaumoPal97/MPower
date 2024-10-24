class CacheStorage {
  constructor() {
    this.cache = {};
  }

  getItem(key) {
    if (this.cache[key]) {
      return this.cache[key];
    }
    this.cache[key] = localStorage.getItem(key);
    return this.cache[key];
  }

  setItem(key, value) {
    this.cache[key] = value;
    localStorage.setItem(key, value);
  }

  removeItem(key) {
    this.cache[key] = null;
    localStorage.removeItem(key);
  }

  clear() {
    this.cache = {};
    localStorage.clear();
  }
}

export default new CacheStorage();
