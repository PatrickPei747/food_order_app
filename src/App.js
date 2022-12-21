import React, { useState } from "react";

import CartProvider from "./store/CartProvider";
import Header from "./components/layout/Header";
import Meals from "./components/meals/Meals";
import Cart from "./components/cart/Cart";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandle = () => {
    setCartIsShown(true);
  };

  const hideCartHandle = () => {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandle} />}
      <Header onCartShow={showCartHandle} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
