import { StyleSheet, View } from "react-native";
import React from "react";
import MyProfile from "../components/profile/MyProfile";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <MyProfile />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
});
