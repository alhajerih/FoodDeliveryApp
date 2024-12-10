import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { useCart } from "../../context/CartContext";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const MenuList = ({ menuItems }) => {
  const { cart, setCart } = useCart();
  const navigation = useNavigation();
  console.log("data inside MenuList", menuItems);
  const handleAddToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem._id === item._id
      );
      return existingItem
        ? prevCart.map((cartItem) =>
            cartItem._id === item._id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          )
        : [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem._id === item._id
      );
      return existingItem
        ? existingItem.quantity === 1
          ? prevCart.filter((cartItem) => cartItem._id !== item._id)
          : prevCart.map((cartItem) =>
              cartItem._id === item._id
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem
            )
        : prevCart;
    });
  };

  const renderMenuItem = ({ item }) => {
    const cartItem = cart.find((cartItem) => cartItem._id === item._id);

    return (
      <TouchableOpacity
        style={styles.menuItemContainer}
        onPress={() =>
          navigation.navigate("DishScreen", {
            dish: item._id,
            cartItem,
          })
        }
        activeOpacity={0.7}
      >
        <Image
          source={{ uri: item.image }}
          style={styles.menuItemImage}
          resizeMode="cover"
        />
        <View style={styles.menuItemDetails}>
          <Text style={styles.menuItemName}>{item.name}</Text>
          <Text style={styles.menuItemPrice}>${item.price.toFixed(2)}</Text>
        </View>
        <View style={styles.quantityControlContainer}>
          <TouchableOpacity
            style={[
              styles.quantityButton,
              !cartItem && styles.quantityButtonDisabled,
            ]}
            onPress={() => handleRemoveFromCart(item)}
            disabled={!cartItem || cartItem.quantity === 0}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>
            {cartItem ? cartItem.quantity : 0}
          </Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleAddToCart(item)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={menuItems}
      keyExtractor={(item) => item._id.toString()}
      renderItem={renderMenuItem}
      contentContainerStyle={styles.menuList}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  menuList: {
    padding: 16,
    paddingBottom: 100,
  },
  menuItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItemImage: {
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: 10,
    marginRight: 12,
  },
  menuItemDetails: {
    flex: 1,
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  menuItemPrice: {
    fontSize: 14,
    fontWeight: "500",
    color: "#4a4a4a",
  },
  quantityControlContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButtonDisabled: {
    backgroundColor: "#B0B0B0",
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    minWidth: 30,
    textAlign: "center",
  },
});

export default MenuList;
