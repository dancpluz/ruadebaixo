export function checkEnvVars(envVars: string[]) {
  envVars.forEach(envVar => {
    if (!process.env[envVar]) {
      throw new Error(`A variável ${envVar} não foi definida`);
    }
  });
}

export function buildImgUrl(url?: string) {
  return url ? process.env.NEXT_PUBLIC_STRAPI_API_URL + url :  undefined;
}

export function generateRandomColor(): string {
  const randomInt = (min: number, max: number): number => 
    Math.floor(Math.random() * (max - min + 1)) + min;

  const hue = randomInt(0, 360);
  const saturation = randomInt(42, 98);
  const lightness = randomInt(40, 90);

  return `hsl(${hue},${saturation}%,${lightness}%)`;
}
