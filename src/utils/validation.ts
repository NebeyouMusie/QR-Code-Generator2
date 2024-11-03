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
      mode: 'cors'  // Changed from 'no-cors' to 'cors' to actually check reachability
    });
    return response.ok;
  } catch {
    return false;  // Return false if there's any error reaching the URL
  }
};