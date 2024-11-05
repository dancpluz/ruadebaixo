import { Produto } from '@/types/api/produto';
import { Variante } from './components/produto/Variante';

interface CartVariant {
  quantity: number;
  variant: Variante;
}

export interface CartItem extends Produto {
  cartVariants: CartVariant[];
};