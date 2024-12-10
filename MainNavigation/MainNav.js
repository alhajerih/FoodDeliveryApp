import { StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RestaurantNavigation from "../navigation/MenuNav/RestaurantNavigation";
import { Ionicons } from "react-native-vector-icons";
import ProfileNavigation from "../navigation/ProfileNav/ProfileNavigation";

const Tab = createBottomTabNavigator();
const MainNav = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Restaurants") {
            iconName = "restaurant-outline";
          } else if (route.name === "Authentication") {
            iconName = "log-in-outline";
          } else if (route.name === "Profile") {
            iconName = "person-outline";
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
      {/* Profile Tab */}
      <Tab.Screen name="Profile" component={ProfileNavigation} />
    </Tab.Navigator>
  );
};

export default MainNav;

const styles = StyleSheet.create({});
