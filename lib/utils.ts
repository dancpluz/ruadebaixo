import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function checkEnvVars(envVars: string[]) {
  envVars.forEach(envVar => {
    if (!process.env[envVar]) {
      throw new Error(`A variável ${envVar} não foi definida`);
    }
  });
}

export function buildImgUrl(url: string): string {
  return process.env.NEXT_PUBLIC_STRAPI_API_URL + url;
}

export function generateRandomColor(): string {
  const randomInt = (min: number, max: number): number => 
    Math.floor(Math.random() * (max - min + 1)) + min;

  const hue = randomInt(0, 360);
  const saturation = randomInt(42, 98);
  const lightness = randomInt(40, 90);

  return `hsl(${hue},${saturation}%,${lightness}%)`;
}

export function getRandomArrayElement<T extends { id: number }>(arr: T[], previousId?: number): T | undefined {
  if (arr.length === 0) return undefined;

  const availableItems = previousId ? arr.filter(item => item.id !== previousId) : arr

  if (availableItems.length === 0) return arr[0];

  const randomIndex = Math.floor(Math.random() * availableItems.length);
  const selected = availableItems[randomIndex];

  return selected;
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
