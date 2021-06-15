export const cacheWithExpiry = (key: string, data: any, expiryTime: number) => {
  const now = new Date();

  const item = {
    value: data,
    expiry: now.getTime() + expiryTime,
  };

  localStorage.setItem(key, JSON.stringify(item));
};

export const retrieveCache = (key: string) => {
    const itemStr = localStorage.getItem(key);

    if (!itemStr) {
      return null
    };

    const item = JSON.parse(itemStr);
    const now = new Date();

    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null
    }
    return item.value
}
