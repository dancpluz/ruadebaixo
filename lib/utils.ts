import { Variante } from "@/types/components/produto/Variante";
import { CartItem } from "@/types/cart";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { FormT } from "@/types/checkout";
import { CustomError } from "@/types/api";

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

function formatValueToString(emoji: string, value?: string, nextLine: boolean = true) {
  return value ? `${emoji} ${value}${nextLine ? '\n' : ''}` : ''
}

export function orderMessage(values: FormT, cartItems: CartItem[], total: number, freight: number, discount: number) {
  const { name, email, cpf, phone, insta, delivery, selectedLocation, selectedDelivery, cep, address, district, city, number, state, complement, feedback, paymentType, parcels } = values;

  const deliveryString = delivery === 'entrega' ? 'Entrega' : 'Retirada'
  const paymentTypeString = paymentType === 'credit' ? 'Cartão de Crédito' : 'PIX'
  const addressString = delivery === 'entrega' ? `${cep} - ${address} ${district} ${state} ${city} ${number} ${complement}\n🦘${selectedDelivery}` : selectedLocation

  return `${formatValueToString('👤', name)}${formatValueToString('🔢', cpf)}${formatValueToString('📧', email)}${formatValueToString('📞', '+55 '+ phone)}${formatValueToString('📱', insta)}${formatValueToString('🚚', deliveryString)}${formatValueToString('🏠', addressString)}${formatValueToString('💳', paymentTypeString)}${formatValueToString('💬', feedback)}
PEDIDO:
${cartItemsToString(cartItems)}

${formatValueToString('🪙', `Subtotal: ${formatToBRL(total - freight + discount)}`)}${formatValueToString('📭', `Frete: ${freight > 0 ? '+' + formatToBRL(freight) : 'Grátis'}`)}${formatValueToString('💸', discount > 0 ? `Desconto: -${formatToBRL(discount)}` : undefined)}*${formatValueToString('💵', paymentType === 'credit' && parcels !== '1' ? `Total: ${formatToBRL(total)} (${parcels}x de ${formatToBRL(total / Number(parcels))})` : 'Total: '+ formatToBRL(total), false)}*`
}

export function cartItemsToString(cartItems: CartItem[]) {
  return cartItems.map(cartItem => {
    return `🏷️ ${cartItem.attributes.tipo} ${cartItem.attributes.nome}: ${cartItem.cartVariants.map(cartVariant => {
      return `${cartItem.attributes.unico ? cartVariant.variant.cor : ''} - [${cartVariant.variant.tamanho}] (${cartVariant.quantity}x ${formatToBRL(applyDiscount(cartVariant.variant.valor, cartVariant.variant.desconto))})`
    }).join('/')}`
  }).join('\n')
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

export function isError(obj: any): obj is { error: CustomError } {
  return obj && typeof obj === 'object' && 'error' in obj;
}

export function logError(error: { error: CustomError } | CustomError) {
  if (isError(error)) {
    console.log(`[${error.error.code}] ${error.error.message}`)
  } else {
    console.log(`[${error.code}] ${error.message}`)
  }
}
