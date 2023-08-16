'use client'

import { createContext, useState, useContext } from "react";
import { useRouter } from 'next/navigation';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [selectedTags,setSelectedTags] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [cartItems,setCartItems] = useState([]);
  const [lastRemovedItem,setLastRemovedItem] = useState(null);
  const [totalPrice,setTotalPrice] = useState(0);
  const [totalDiscount,setTotalDiscount] = useState(0);

  const router = useRouter();

  const onAdd = (product,show) => {
    const checkProductInCart = cartItems.find((item) => item.id === product.id);

    if (!checkProductInCart) {
      setTotalDiscount(totalDiscount + product.discount);
      setTotalPrice(totalPrice + product.price);
      setCartItems(oldArray => [...oldArray,product]);
      // Toast
    } else {
      // Toast
    }

    if (show) {
      setShowCart(true);
    }
  }

  const onRemove = (product) => {
    if (!lastRemovedItem) {
      setTotalDiscount(totalDiscount - product.discount);
      setTotalPrice(totalPrice - product.price);
      setCartItems(cartItems.filter((item) => item !== product));
      setLastRemovedItem(product);
    } else {
      setLastRemovedItem(null);
    }
  }

  const onBuy = () => {
    setTotalDiscount(0)
    setTotalPrice(0)
    setLastRemovedItem(null)
    setCartItems([]);
  }

  const onUndo = () => {
    setTotalDiscount(totalDiscount + lastRemovedItem.discount);
    setTotalPrice(totalPrice + lastRemovedItem.price);
    setCartItems(oldArray => [...oldArray,lastRemovedItem]);
    setLastRemovedItem(null);
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