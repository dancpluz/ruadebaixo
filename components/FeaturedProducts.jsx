import Product from "./Product";
import Center from "./Center";
import camisa1 from '../assets/overlay.png';
import camisa2 from '../assets/camisa.webp';

export default function ProductList() {
  const product1 = {
    _id: 0,
    slug: 'test',
    image: camisa1,
    name: 'Camiseta Noggers',
    price: 20,
  };

  const product2 = {
    _id: 0,
    slug: 'test',
    image: camisa2,
    name: 'Camiseta Pog',
    price: 20,
  };

  const products = [product1,product2,product1,product2]
  
  return (
    <>
      {products?.map((product) => <Product key={product._id} product={product} />)}
    </>
  )
}
