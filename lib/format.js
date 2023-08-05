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