import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { CartProvider } from "./context/CartContext";
import { NavigationContainer } from "@react-navigation/native";

import MainNav from "./MainNavigation/MainNav";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { checkToken } from "./src/api/storage";
import UserContext from "./context/UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthNavigation from "./navigation/AuthNav/AuthNavigation";

const queryClient = new QueryClient();
const Tab = createBottomTabNavigator();

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);

  //Checking token if its exists
  useEffect(() => {
    const checkAuthentication = async () => {
      const isAuthenticated = await checkToken();
      setAuthenticated(isAuthenticated);
    };
    checkAuthentication();
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={[authenticated, setAuthenticated]}>
        <CartProvider>
          <NavigationContainer>
            <SafeAreaProvider style={styles.screenContainer}>
              {authenticated ? <MainNav /> : <AuthNavigation />}
            </SafeAreaProvider>
          </NavigationContainer>
        </CartProvider>
      </UserContext.Provider>
    </QueryClientProvider>
  );
}
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
});
