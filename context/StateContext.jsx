import { createContext, useState, useContext } from "react";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [selectedTags,setSelectedTags] = useState(['cu','pogs']);

  return (
    <Context.Provider
      value={{
        selectedTags,
        setSelectedTags
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);