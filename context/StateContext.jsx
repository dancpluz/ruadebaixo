import { createContext, useState, useContext } from "react";
import camisa1 from '../assets/product2.png';

const Context = createContext();
const product = {
  _id: 0,
  slug: 'test',
  images: [camisa1],
  name: '5 Panel Cairo Beige',
  desc: 'Boné 5 panel com protetor de pescoço estampado removível e gráfico bordado.',
  size: 'M',
  wears: 'G',
  discount: 0,
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
  const [totalItems,setTotalItems] = useState(0);
  const [lastRemovedItem,setLastRemovedItem] = useState(null)

  return (
    <Context.Provider
      value={{
        selectedTags,
        setSelectedTags,
        showCart,
        setShowCart,
        cartItems,
        setCartItems,
        totalPrice,
        setTotalPrice,
        totalItems,
        setTotalItems,
        lastRemovedItem,
        setLastRemovedItem
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);