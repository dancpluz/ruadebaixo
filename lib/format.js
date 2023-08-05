export function extractNameFromUrl(url) {
  // Split the URL by slashes and get the last part
  const parts = url.split('/');
  const lastPart = parts[parts.length - 1];

  // Remove the file extension and hash using regex
  const name = lastPart.replace(/\..+$/,'');

  return name;
}

export function extractImageDimensions(url) {
  const regex = /-(\d+)x(\d+)\./;
  const match = url.match(regex);

  if (match) {
    const width = parseInt(match[1],10);
    const height = parseInt(match[2],10);
    return { width,height };
  }
  return null;
}

export function formatDate(string) {
  let stringArray = string.split('-')

  return `${stringArray[2]}/${stringArray[1]}/${stringArray[0]}`;
}