import React from "react";

export const BottomNavValueContext = React.createContext();

export const BottomNavValueProvider = ({ children }) => {
  const [bottomNavValue, setBottomNavValue] = React.useState(null);

  return (
    <BottomNavValueContext.Provider
      value={{ bottomNavValue, setBottomNavValue }}
    >
      {children}
    </BottomNavValueContext.Provider>
  );
};
