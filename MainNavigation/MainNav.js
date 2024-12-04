import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import RestaurantNavigation from "../navigation/MenuNav/RestaurantNavigation";
import AuthNavigation from "../navigation/AuthNav/AuthNavigation";
import { Ionicons } from "react-native-vector-icons";

const Tab = createBottomTabNavigator();
const MainNav = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === "Restaurants") {
              iconName = "restaurant-outline";
            } else if (route.name === "Authentication") {
              iconName = "log-in-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#007bff",
          tabBarInactiveTintColor: "gray",
          headerShown: false,
        })}
      >
        {/* Restaurants Tab */}
        <Tab.Screen name="Restaurants" component={RestaurantNavigation} />

        {/* Authentication Tab */}
        <Tab.Screen name="Authentication" component={AuthNavigation} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainNav;

const styles = StyleSheet.create({});
