
export const optimizeImage = (url: string, width: number = 800) => {
  if (!url) return '';
  // Skip optimization for local paths or data URIs
  if (url.startsWith('/') || url.startsWith('data:') || url.startsWith('blob:')) return url;

  try {
    const urlObj = new URL(url);

    // Unsplash Optimization
    if (urlObj.hostname.includes('unsplash.com')) {
      urlObj.searchParams.set('w', width.toString());
      urlObj.searchParams.set('q', '80');
      urlObj.searchParams.set('auto', 'format');
      urlObj.searchParams.set('fit', 'crop');
      return urlObj.toString();
    }

    // Generic Optimization via wsrv.nl (Privacy-focused image proxy)
    // Converts to WebP, resizes, and compresses
    return `https://wsrv.nl/?url=${encodeURIComponent(url)}&w=${width}&output=webp&q=80`;

  } catch (e) {
    // Return original URL if parsing fails
    return url;
  }
};
