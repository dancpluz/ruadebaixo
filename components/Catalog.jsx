'use client'

import Card from '@/components/Card';


export default function Catalog({products}) {
  return (
    <>
      {products ? products.map((product) => (
          <Card key={product.slug.current} product={product} />
        )): null}
    </>
  )
}
