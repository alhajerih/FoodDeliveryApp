import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { CartProvider } from "./context/CartContext";

import MainNav from "./MainNavigation/MainNav";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <CartProvider>
      <MainNav />
    </CartProvider>
  );
}
