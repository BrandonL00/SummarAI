export const extractFileKeyFromUrl = (url) => {
    if (typeof url !== 'string') {
      console.error("Error extracting fileKey from URL: URL is not a string", url);
      return null;
    }
  
    try {
      const match = url.match(/\.com\/([^?]+)\?/);
      if (match && match[1]) {
        return match[1];
      } else {
        console.error("Error extracting fileKey from URL: No match found", url);
        return null;
      }
    } catch (error) {
      console.error("Error extracting fileKey from URL:", error);
      return null;
    }
  };