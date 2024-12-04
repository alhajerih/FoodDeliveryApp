import React from "react";
import { StyleSheet, Text } from "react-native";
import CartSummary from "../components/shoppingCart/CartSummary";

const CartSummaryScreen = ({ route }) => {
  // const { cart, setCart } = route.params; // Access cart passed from MenuScreen

  return <CartSummary />;
};

export default CartSummaryScreen;

const styles = StyleSheet.create({
  screenContainer: {
    // flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
});
