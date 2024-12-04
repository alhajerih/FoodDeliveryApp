import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useCart } from "../../context/CartContext";
import { Feather } from "@expo/vector-icons";

const DishDetails = ({ dish }) => {
  const { cart, setCart } = useCart();

  // Add item to the cart
  const handleAddToCart = () => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === dish.id);
      return existingItem
        ? prevCart.map((cartItem) =>
            cartItem.id === dish.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          )
        : [...prevCart, { ...dish, quantity: 1 }];
    });
  };

  // Remove item from the cart
  const handleRemoveFromCart = () => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === dish.id);
      return existingItem.quantity === 1
        ? prevCart.filter((cartItem) => cartItem.id !== dish.id)
        : prevCart.map((cartItem) =>
            cartItem.id === dish.id
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem
          );
    });
  };

  // Find the cart item for this dish
  const cartItem = cart.find((cartItem) => cartItem.id === dish.id);

  return (
    <View style={styles.screenContainer}>
      <Image
        source={{ uri: dish.image }}
        style={styles.dishImage}
        resizeMode="cover"
      />
      <View style={styles.dishDetails}>
        <Text style={styles.dishName}>{dish.name}</Text>
        <Text style={styles.dishPrice}>Price: ${dish.price.toFixed(2)}</Text>
        <Text style={styles.dishDescription}>{dish.description}</Text>
      </View>
      <View style={styles.quantityControlContainer}>
        <View style={styles.quantityControl}>
          <TouchableOpacity
            onPress={handleRemoveFromCart}
            disabled={!cartItem || cartItem.quantity === 0}
          >
            <Text style={styles.quantityButton}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>
            {cartItem ? cartItem.quantity : 0}
          </Text>
          <TouchableOpacity onPress={handleAddToCart}>
            <Text style={styles.quantityButton}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  dishImage: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  dishDetails: {
    flex: 1,
    justifyContent: "flex-start",
  },
  dishName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dishPrice: {
    fontSize: 18,
    color: "green",
    marginBottom: 10,
  },
  dishDescription: {
    fontSize: 16,
    color: "#555",
  },
  quantityControlContainer: {
    alignItems: "center",
    marginVertical: 15,
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 15,
    width: 120,
    justifyContent: "space-between",
  },
  quantityButton: {
    fontSize: 20,
    fontWeight: "500",
    color: "#333",
    paddingHorizontal: 8,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    minWidth: 20,
    textAlign: "center",
  },
});

export default DishDetails;
