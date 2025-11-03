export function shouldIncludeInSitemap(url: string): boolean {
  if (!url || url.includes('404') || url.includes('admin')) {
    return false;
  }
  
  const isRoot = url === 'https://sapiensit.com' || url === 'https://sapiensit.com/';
  
  if (isRoot) {
    return true;
  }
  
  if (!url.endsWith('/')) {
    return false;
  }
  
  return true;
}

