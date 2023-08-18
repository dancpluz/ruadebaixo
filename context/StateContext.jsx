'use client'

import { createContext, useState, useContext } from "react";
import { useRouter } from 'next/navigation';
import { storeCartData,getCartData,getNumberData } from '@/lib/localStorage'

const Context = createContext();

const storedCart = getCartData();
const storedPrice = getNumberData('price');
const storedDiscount = getNumberData('discount');

export const StateContext = ({ children }) => {
  const [selectedTags,setSelectedTags] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [cartItems,setCartItems] = useState(storedCart);
  const [lastRemovedItem,setLastRemovedItem] = useState(null);
  const [totalPrice,setTotalPrice] = useState(storedPrice);
  const [totalDiscount,setTotalDiscount] = useState(storedDiscount);

  const router = useRouter();

  const onAdd = async (product,show) => {
    const checkProductInCart = await cartItems.find((item) => item.id === product.id);

    if (!checkProductInCart) {
      const addedCart = [...cartItems,product];
      const discount = totalDiscount + product.discount;
      const price = totalPrice + product.price;
      
      setTotalDiscount(discount);
      setTotalPrice(price);
      setCartItems(addedCart);

      storeCartData(addedCart, price, discount);
      // Toast
    } else {
      // Toast
    }

    if (show) {
      setShowCart(true);
    }
  }

  const onRemove = (product) => {
    if (!lastRemovedItem || (product.id !== lastRemovedItem.id)) {
      const discount = totalDiscount - product.discount;
      const price = totalPrice - product.price;
      const filteredCart = cartItems.filter((item) => item !== product)

      setTotalDiscount(discount);
      setTotalPrice(price);
      setCartItems(filteredCart);
      setLastRemovedItem(product);

      storeCartData(filteredCart, price, discount);
    } else {
      setLastRemovedItem(null);
    }
  }

  const onBuy = () => {
    setTotalDiscount(0);
    setTotalPrice(0);
    setLastRemovedItem(null);
    setCartItems([]);

    storeCartData([],0,0);
  }

  const onUndo = () => {
    const discount = totalDiscount + lastRemovedItem.discount;
    const price = totalPrice + lastRemovedItem.price;
    const undoCart = [...cartItems,lastRemovedItem];

    setTotalDiscount(discount);
    setTotalPrice(price);
    setCartItems(undoCart);
    setLastRemovedItem(null);

    storeCartData(undoCart, price, discount);
  }

  return (
    <Context.Provider
      value={{
        selectedTags,
        setSelectedTags,
        showCart,
        setShowCart,
        cartItems,
        setCartItems,
        totalDiscount,
        totalPrice,
        lastRemovedItem,
        setLastRemovedItem,
        onAdd,
        onRemove,
        onUndo,
        router,
        onBuy
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);