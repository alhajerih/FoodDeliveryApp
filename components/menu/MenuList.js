import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useCart } from "../../context/CartContext";
import { useNavigation } from "@react-navigation/native";

const MenuList = ({ menuItems }) => {
  const { cart, setCart } = useCart();
  const navigation = useNavigation();

  const handleAddToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      return existingItem
        ? prevCart.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          )
        : [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      return existingItem
        ? existingItem.quantity === 1
          ? prevCart.filter((cartItem) => cartItem.id !== item.id)
          : prevCart.map((cartItem) =>
              cartItem.id === item.id
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem
            )
        : prevCart;
    });
  };

  return (
    <FlatList
      data={menuItems}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => {
        const cartItem = cart.find((cartItem) => cartItem.id === item.id);

        return (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("DishScreen", {
                dish: item,
                cartItem,
              })
            }
          >
            <View style={styles.menuItemContainer}>
              <Image
                source={{ uri: item.image }}
                style={styles.menuItemImage}
                resizeMode="cover"
              />
              <View style={styles.menuItemDetails}>
                <Text style={styles.menuItemName}>{item.name}</Text>
                <Text style={styles.menuItemPrice}>
                  ${item.price.toFixed(2)}
                </Text>
              </View>
              <View style={styles.quantityControlContainer}>
                <View style={styles.quantityControl}>
                  <TouchableOpacity
                    onPress={() => handleRemoveFromCart(item)}
                    disabled={!cartItem || cartItem.quantity === 0}
                  >
                    <Text style={styles.quantityButton}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>
                    {cartItem ? cartItem.quantity : 0}
                  </Text>
                  <TouchableOpacity onPress={() => handleAddToCart(item)}>
                    <Text style={styles.quantityButton}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
      contentContainerStyle={styles.menuList}
    />
  );
};

const styles = StyleSheet.create({
  menuList: {
    paddingBottom: 20,
  },
  menuItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  menuItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  menuItemDetails: {
    flex: 1,
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  menuItemPrice: {
    fontSize: 14,
    color: "#888",
  },
  quantityControlContainer: {
    alignItems: "center",
    marginTop: 40,
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

export default MenuList;
