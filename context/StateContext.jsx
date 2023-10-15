'use client'

import { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { storeCartData,getCartData,getNumberData,getFormData,clearStorage } from '@/lib/localStorage'
import { checkLocalStorageVersion } from '@/lib/config';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [selectedTags,setSelectedTags] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [cartItems,setCartItems] = useState([]);
  const [lastRemovedItem,setLastRemovedItem] = useState(null);
  const [totalPrice,setTotalPrice] = useState(0);
  const [totalDiscount,setTotalDiscount] = useState(0);
  const [expandMeasures, setExpandMeasures] = useState(false);

  useEffect(() => {
    const version = getFormData('version');

    const checkVersion = async () => {
      const localStorageVersion = await checkLocalStorageVersion();

      if (version != localStorageVersion) {
        clearStorage('version',localStorageVersion);
        localStorage.setItem("version", localStorageVersion);
      }
    }
    checkVersion()
    
    const storedCart = getCartData();
    const storedPrice = getNumberData('price');
    const storedDiscount = getNumberData('discount');

    setCartItems(storedCart);
    setTotalPrice(storedPrice);
    setTotalDiscount(storedDiscount);
  }, [])

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
        setTotalDiscount,
        totalPrice,
        lastRemovedItem,
        setLastRemovedItem,
        onAdd,
        onRemove,
        onUndo,
        router,
        onBuy,
        expandMeasures,
        setExpandMeasures
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);