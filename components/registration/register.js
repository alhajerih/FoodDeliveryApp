import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { register } from "../../src/api/auth";
import { useMutation } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
const Register = () => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState({ username: "", password: "" });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [image, setImage] = useState(null);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const { mutate } = useMutation({
    mutationFn: () => register(userInfo, image),
    onSuccess: () => {
      Alert.alert("Success", "Account created successfully");
      navigation.navigate("Login");
    },
    onError: (error) => {
      console.error(error);
      Alert.alert("Error", "Registration failed. Please try again.");
    },
  });

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleRegister = () => {
    console.log("Register button clicked");
    if (!userInfo.username || !userInfo.password) {
      console.log("Username or password is missing:", { username, password });

      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    mutate();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={userInfo.username}
        onChangeText={(text) => setUserInfo({ ...userInfo, username: text })}
        autoCapitalize="none"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          value={userInfo.password}
          onChangeText={(text) => setUserInfo({ ...userInfo, password: text })}
          secureTextEntry={!isPasswordVisible}
          autoCapitalize="none"
        />
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.icon}
        >
          <Icon
            name={isPasswordVisible ? "eye" : "eye-off"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={{ marginTop: 20 }} onPress={pickImage}>
        <Text style={{ fontSize: 16 }}>Upload Profile Image</Text>
        {image && (
          <Image
            source={{ uri: image }}
            style={{
              width: 100,
              height: 100,
            }}
          />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => {
          handleRegister();
        }}
      >
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
      <Text style={styles.loginContainer}>
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.loginText}> Log In</Text>
        </TouchableOpacity>
      </Text>
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  passwordContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    backgroundColor: "#fff",
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  passwordInput: {
    flex: 1,
    height: 50,
  },
  icon: {
    padding: 10,
  },
  registerButton: {
    backgroundColor: "#007bff",
    width: "100%",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginContainer: {
    marginTop: 20,
  },
  loginText: {
    marginBottom: -4,
    color: "#007bff",
    fontSize: 14,
  },
});
