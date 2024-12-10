import React from "react";
import { View, StyleSheet } from "react-native";
import Register from "../components/registration/register";
const RegisterScreen = () => {
  return (
    <View style={styles.container}>
      <Register />
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
});
