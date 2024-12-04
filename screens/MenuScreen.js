import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import RestaurantHeader from "../components/menu/RestaurantHeader";
import MenuList from "../components/menu/MenuList";
import { useCart } from "../context/CartContext";

const MenuScreen = ({ route, navigation }) => {
  const { restaurant } = route.params;
  const { cart } = useCart(); // Only access cart to display the cart button

  return (
    <View style={styles.screenContainer}>
      {/* Restaurant Header */}
      <RestaurantHeader restaurant={restaurant} />

      {/* Menu List */}
      <MenuList menuItems={restaurant.menuItems} navigation={navigation} />

      {/* View Cart Button */}
      {/* {cart.length > 0 && (
        <TouchableOpacity
          style={styles.viewCartButton}
          onPress={() => navigation.navigate("ShoppingCart")}
        >
          <Text style={styles.viewCartButtonText}>
            View Cart ({cart.length})
          </Text>
          <Feather name="shopping-cart" size={24} color="#fff" />
        </TouchableOpacity>
      )} */}
    </View>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  viewCartButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#4CAF50",
    paddingVertical: 16,
    paddingHorizontal: 24,
    margin: 20,
    borderRadius: 30,
  },
  viewCartButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
