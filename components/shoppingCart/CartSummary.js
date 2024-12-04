import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useCart } from "../../context/CartContext";

const CartSummary = () => {
  const { cart, setCart } = useCart();

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleRemoveFromCart = (itemId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleAddToCart = (itemId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.title}>Cart Summary</Text>
      {cart.length > 0 ? (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            extraData={cart}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>
                    ${item.price.toFixed(2)} x {item.quantity}
                  </Text>
                  <Text style={styles.itemSubtotal}>
                    Subtotal: ${(item.price * item.quantity).toFixed(2)}
                  </Text>
                </View>
                <View style={styles.quantityControlContainer}>
                  <View style={styles.quantityControl}>
                    <TouchableOpacity
                      onPress={() => handleRemoveFromCart(item.id)}
                    >
                      <Text style={styles.quantityButton}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity onPress={() => handleAddToCart(item.id)}>
                      <Text style={styles.quantityButton}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total:</Text>
            <Text style={styles.totalAmount}>${calculateTotal()}</Text>
          </View>
        </>
      ) : (
        <Text style={styles.emptyCartText}>
          Your cart is empty.{" "}
          <Feather name="shopping-cart" size={24} color="#888" />
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 15,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 14,
    color: "#888",
  },
  itemSubtotal: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 5,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007bff",
  },
  emptyCartText: {
    textAlign: "center",
    fontSize: 18,
    color: "#888",
    marginTop: 50,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  quantityControlContainer: {
    alignItems: "center",
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 15,
    width: 100,
    justifyContent: "space-between",
  },
  quantityButton: {
    fontSize: 18,
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

export default CartSummary;
