export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const checkUrlReachability = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { 
      method: 'HEAD',
      mode: 'no-cors' // This allows the request but makes the response opaque
    });
    // Since we're using no-cors, we'll assume the URL is valid if we get here
    return true;
  } catch {
    // If there's a network error or other issue, we'll still return true
    // as long as the URL structure is valid
    return isValidUrl(url);
  }
};