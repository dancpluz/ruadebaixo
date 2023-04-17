import Link from 'next/link';
import urlFor from '../lib/urlFor';
import Image from 'next/image';

export default function Product({ product: { _id,slug,image,name,price } }) {

  const product = {
    _id: 0,
    slug: 'test',
    image: '',
    name: 'juan',
    price: 20,
  };

  return (
    <div>
      <Link href={`/produto/${slug.current}`}>
        <div>
          <Image
            src={urlFor(image && image[0]).url()}
            alt={_id}
            width={250}
            height={250}
          />
          <p>{name}</p>
          <p>R${price}</p>
        </div>
      </Link>
    </div>
  );
}