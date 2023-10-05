export function formatDate(string) {
  let stringArray = string.split('-')

  return `${stringArray[2]}/${stringArray[1]}/${stringArray[0]}`;
}

export function formatFloat(number) {
  if (number % 1 != 0) {
    return number.toFixed(2).toString().replace(".",",")
  }
  return number
}

export function sortLocations(array) {
  return array.slice().sort((a,b) => a.local.localeCompare(b.local));
}