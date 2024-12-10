import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useCart } from "../../context/CartContext";
import { Feather } from "@expo/vector-icons";

const DishDetails = ({ dish }) => {
  const { cart, setCart } = useCart();

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

  const cartItem = cart.find((cartItem) => cartItem.id === dish.id);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: dish.image }}
            style={styles.dishImage}
            resizeMode="cover"
          />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.dishDetails}>
            <Text style={styles.dishName}>{dish.name}</Text>
            <Text style={styles.dishPrice}>${dish.price.toFixed(2)}</Text>
            <Text style={styles.dishDescription}>{dish.description}</Text>
          </View>
          <View style={styles.quantityControlContainer}>
            <TouchableOpacity
              style={[
                styles.quantityButton,
                !cartItem && styles.quantityButtonDisabled,
              ]}
              onPress={handleRemoveFromCart}
              disabled={!cartItem || cartItem.quantity === 0}
            >
              <Feather
                name="minus"
                size={24}
                color={cartItem ? "white" : "#B0B0B0"}
              />
            </TouchableOpacity>
            <Text style={styles.quantityText}>
              {cartItem ? cartItem.quantity : 0}
            </Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={handleAddToCart}
            >
              <Feather name="plus" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
    marginTop: 5,
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    width: "100%",
    height: 300,
    overflow: "hidden",
  },
  dishImage: {
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  dishDetails: {
    marginBottom: 20,
  },
  dishName: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  dishPrice: {
    fontSize: 22,
    fontWeight: "600",
    color: "#4CAF50",
    marginBottom: 16,
  },
  dishDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: "#4a4a4a",
  },
  quantityControlContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  quantityButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButtonDisabled: {
    backgroundColor: "#E0E0E0",
  },
  quantityText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a1a1a",
    marginHorizontal: 20,
    minWidth: 30,
    textAlign: "center",
  },
});

export default DishDetails;
