import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "react-native-vector-icons";

// Import Cart Context Hook
import { useCart } from "../../context/CartContext";

import RestaurantCatagoriesScreen from "../../screens/RestaurantCatagoriesScreen";
import MenuScreen from "../../screens/MenuScreen";
import DishScreen from "../../screens/DishScreen";
import ShoppingCartScreen from "../../screens/ShoppingCartScreen";
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

const RestaurantNavigation = () => {
  const { cart } = useCart(); // Use the custom hook to access cart
  const navigation = useNavigation();
  // Header Right Component (Cart Icon with Badge)
  const renderCartIcon = () => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Restaurants", { screen: "ShoppingCart" })
      }
      style={{ marginRight: 15 }}
    >
      <Ionicons name="cart-outline" size={24} color="#007bff" />
      {cart.length > 0 && (
        <View
          style={{
            position: "absolute",
            right: -6,
            top: -3,
            backgroundColor: "red",
            borderRadius: 10,
            width: 18,
            height: 18,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 12 }}>{cart.length}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RestaurantCategories"
        component={RestaurantCatagoriesScreen}
        options={{
          title: "Restaurants",
          headerRight: renderCartIcon, // Add Cart Icon to Header
        }}
      />
      <Stack.Screen
        name="Menu"
        component={MenuScreen}
        options={({ route }) => ({
          title: route.params?.restaurantName || "Menu",
          headerRight: renderCartIcon, // Add Cart Icon to Header
        })}
      />
      <Stack.Screen
        name="DishScreen"
        component={DishScreen}
        options={({ route }) => ({
          title: route.params?.dish.name || "Dish Details",
          headerRight: renderCartIcon, // Add Cart Icon to Header
        })}
      />
      <Stack.Screen
        name="ShoppingCart"
        component={ShoppingCartScreen}
        options={{
          title: "Shopping Cart",
        }}
      />
    </Stack.Navigator>
  );
};

export default RestaurantNavigation;

const styles = StyleSheet.create({});
