import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getCartItemsFromLocalStorage,
  setCartItemsToLocalStorage,
} from "./cartModel";

interface CartItem {
  readonly id: number | string;
  readonly price: number;
  readonly title: string;
  readonly count: number;
}

interface CartState {
  readonly items: readonly CartItem[];
  readonly addItemToCart: (item: CartItem) => void;
  readonly removeItemFromCart: (id: CartItem["id"]) => void;
}

export const CartStateContext = createContext<CartState | null>(null);

export const CartStateContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setCartItems(getCartItemsFromLocalStorage());
  }, []);

  useEffect(() => {
    setCartItemsToLocalStorage(cartItems);
  }, [cartItems]);

  return (
    <CartStateContext.Provider
      value={{
        items: cartItems,
        addItemToCart: (item) => {
          setCartItems((prevState) => {
            const existingItem = prevState.find(
              (existingItem) => existingItem.id === item.id
            );
            if (!existingItem) {
              return [...cartItems, item];
            }

            return prevState.map((existingItem) => {
              if (existingItem.id === item.id) {
                return {
                  ...existingItem,
                  count: existingItem.count + 1,
                };
              }
              return existingItem;
            });
          });
        },
        removeItemFromCart: (id) => {
          setCartItems((prevState) => {
            const existingItem = prevState.find((eItem) => eItem.id === id);

            if (existingItem && existingItem.count <= 1) {
              return prevState.filter((eItem) => eItem.id !== id);
            }

            return prevState.map((eItem) => {
              if (eItem.id === id) {
                return {
                  ...eItem,
                  count: eItem.count - 1,
                };
              }
              return eItem;
            });
          });
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
