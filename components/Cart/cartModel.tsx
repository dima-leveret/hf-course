export const getCartItemsFromLocalStorage = () => {
  const itemsFromLocalStorage = localStorage.getItem("SHOPPING_CART");
  if (!itemsFromLocalStorage) {
    return [];
  }

  try {
    const items = JSON.parse(itemsFromLocalStorage);
    return items;
  } catch (err) {
    console.error(err);
    return [];
  }
};

interface CartItem {
  readonly id: number | string;
  readonly price: number;
  readonly title: string;
  readonly count: number;
}

export const setCartItemsToLocalStorage = (cartItems: CartItem[]) => {
  localStorage.setItem("SHOPPING_CART", JSON.stringify(cartItems));
};
