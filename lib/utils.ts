import { Variante } from "@/types/components/produto/Variante";
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

export function buildImgUrl(url: string) {
  return process.env.NEXT_PUBLIC_STRAPI_API_URL + url;
}

export function roundToDecimal(number: number) {
  return Math.round((number + Number.EPSILON) * 100) / 100
}

interface ImageFormats {
  large?: { url: string };
  medium?: { url: string };
  small?: { url: string };
  thumbnail?: { url: string };
  url?: string;
}

export function selectImageUrl(formats: ImageFormats) {
  return {
    imageUrl: formats.large?.url || formats.medium?.url || formats.small?.url || formats.url || '',
    sizes: `
  (max-width: 640px) 100vw,
  (max-width: 1024px) 50vw,
  33vw                    
`,
  };
}

export function checkProductAvailability(variantes: Variante[]) {
  return variantes.reduce((acc, variante) => acc + variante.quantidade, 0) > 0
}

export const hoverAnim = 'relative flex after:absolute after:bg-foreground after:bottom-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300'

export function formatToBRL(value: number, options={ showCurrencySymbol: true }) {
  const { showCurrencySymbol } = options;
  const hasDecimals = value % 1 !== 0;
  return value.toLocaleString('pt-BR', { 
    style: showCurrencySymbol ? 'currency' : 'decimal', 
    currency: 'BRL', 
    minimumFractionDigits: hasDecimals ? 2 : 0, 
    maximumFractionDigits: hasDecimals ? 2 : 0 
  });
}

export function applyDiscount(value: number, discount: number) {
  if (discount >= value || value === 0) {
    return value
  } else if (discount < 1) {
    return value * (1 - discount)
  } else if (discount >= 1) {
    return value - discount
  } else {
    return value
  }
}
