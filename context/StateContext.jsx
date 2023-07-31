import { createContext, useState, useContext } from "react";
import camisa1 from 'test/product1.png';

const Context = createContext();
const product = {
  _id: 0,
  slug: 'test',
  images: [camisa1],
  name: '5 Panel Cairo Beige',
  desc: 'Boné 5 panel com protetor de pescoço estampado removível e gráfico bordado.',
  size: 'M',
  wears: 'G',
  discount: 5,
  price: 20,
  type: 'boné',
  quality: 'usado',
  tags: ['internacional','vintage'],
  points: ['Pequeno arranhão no lado esquerdo','Gola deformada','Pequena mancha no canto da camiseta','teste','214124','poggers'],
  sold: true
};

export const StateContext = ({ children }) => {
  const [selectedTags,setSelectedTags] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [cartItems,setCartItems] = useState([product]);
  const [totalPrice,setTotalPrice] = useState(0);
  const [totalDiscount,setTotalDiscount] = useState(0);
  const [lastRemovedItem,setLastRemovedItem] = useState(null);

  const onAdd = (product,show) => {
    const checkProductInCart = cartItems.find((item) => item._id === product._id);

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
        onUndo
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);