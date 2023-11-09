"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import CircularProgress from '@mui/material/CircularProgress';
//import { ProductsDiv } from "@/components/Catalog";
import styled from 'styled-components';
import { fetchCatalogProducts } from '@/lib/api';
import Card from '@/components/Card';

const Spinner = styled(CircularProgress)`
  position: absolute;
  bottom: 0;
  right: 0;
`;

export default function LoadMore({ searchParams, count }) {
  const [products, setProducts] = useState([]);
  const [interval, setInterval] = useState(0);

  const { ref, inView } = useInView();

  const loadMoreProducts = async () => {
    await delay(300);
    const nextInterval = interval + 1;
    const newProducts = await fetchCatalogProducts(searchParams, nextInterval) ?? [];
    setProducts((prevProducts) => [...prevProducts, ...newProducts]);
    setInterval(nextInterval);
  }

  const delay = (delayInms) => {
    return new Promise(resolve => setTimeout(resolve,delayInms));
  };

  useEffect(() => {
    setProducts([]);
    setInterval(0);
  }, [searchParams]);

  useEffect(() => {
    //console.log(products);
    if (inView) {
      loadMoreProducts();
    }
  }, [inView]);

  return (
    <>
      {
        products.map((product) => (
            <Card key={`${product.slug.current}`} product={product} />
          ))
      }
      {count > products.length + 10 && <Spinner color='inherit' ref={ref}/>}
    </>
  )
}