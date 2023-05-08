import exp from "constants";
import { ReactNode, createContext, useContext } from "react";
import { useState } from "react";

interface CartItem {
  price: number;
  title: string;
}

interface CartState {
  items: CartItem[];
  addItemToCart: (item: CartItem) => void;
}

export const CartStateContext = createContext<CartState | null>(null);

export const CartStateContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  return (
    <CartStateContext.Provider
      value={{
        items: cartItems,
        addItemToCart: (item) => {
          setCartItems((cartItems) => [...cartItems, item]);
        },
      }}>
      {children}
    </CartStateContext.Provider>
  );
};

export const useCartSate = () => {
  const cartState = useContext(CartStateContext);
  if (!cartState) {
    throw new Error("You forgot Provider!");
  }
  return cartState;
};
