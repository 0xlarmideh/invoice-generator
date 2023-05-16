import { createContext, useState } from "react";

export const ShowMenu = createContext()

export const ShowMenuProvider = ({ children }) => {
  const [isShow, setShow] = useState(false);
  const toggleMenu = () => {
    setShow(!isShow);
  };
  return (
    <ShowMenu.Provider value={{ isShow, toggleMenu }}>
      {children}
    </ShowMenu.Provider>
  );
};

