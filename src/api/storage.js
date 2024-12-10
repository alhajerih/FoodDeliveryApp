import { setItemAsync, deleteItemAsync, getItemAsync } from "expo-secure-store";

const setToken = async (token) => {
  try {
    await setItemAsync("token", token);
    console.log("Token stored successfully ");
    console.log("Token :", token);
  } catch (error) {
    console.error("Error storing the token:", error);
  }
};

const getToken = async () => {
  try {
    const token = await getItemAsync("token");
    return token;
  } catch (error) {
    console.error("Error retrieving the token:", error);
  }
};

const deleteToken = async () => {
  try {
    await deleteItemAsync("token");
    console.log("Token deleted successfully");
  } catch (error) {
    console.error("Error deleting the token:", error);
  }
};

export { setToken, getToken, deleteToken };
