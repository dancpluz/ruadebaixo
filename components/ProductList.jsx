import Product from "./Product";
import Center from "./Center";
import camisa from '../assets/overlay.png';

export default function ProductList() {
  const product = {
    _id: 0,
    slug: 'test',
    image: camisa,
    name: 'juan',
    price: 20,
  };
  
  return (
    <Center>
      <Product product={product} />
    </Center>
  )
}
