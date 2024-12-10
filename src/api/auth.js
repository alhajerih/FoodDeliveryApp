import instance from "./index";
import { setToken } from "./storage";

const register = async (userInfo, image) => {
  const formData = new FormData();
  for (const key in userInfo) {
    formData.append(key, userInfo[key]);
  }

  formData.append("image", {
    name: "image.jpg",
    type: "image/jpeg",
    uri: image,
  });

  try {
    const { data } = await instance.post("/auth/register", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setToken(data.token);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const login = async (userInfo) => {
  try {
    const { data } = await instance.post("/auth/login", userInfo);
    console.log("the token :", data.token);
    setToken(data.token);
    return data;
  } catch (error) {
    console.log("Login error:", error.response?.data || error.message);
    throw error;
  }
};

// Get Profile
const getProfile = async () => {
  try {
    const { data } = await instance.get("/auth/profile");
    return data;
  } catch (error) {
    console.error("Error fetching profile:", error.response?.data || error);
    throw error;
  }
};

// Get All Categories
const getAllCategories = async () => {
  try {
    const { data } = await instance.get("/category");
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error.response?.data || error);
    throw error;
  }
};

// Get All Restaurants
const getAllRestaurants = async () => {
  try {
    const { data } = await instance.get("/resturant");
    return data;
  } catch (error) {
    console.error("Error fetching restaurants:", error.response?.data || error);
    throw error;
  }
};

// Get Restaurant By ID
const getRestaurantById = async (id) => {
  try {
    const { data } = await instance.get(`/resturant/${id}`);
    return data;
  } catch (error) {
    console.error(
      `Error fetching restaurant with ID ${id}:`,
      error.response?.data || error
    );
    throw error;
  }
};

// Get Restaurant Items
const getRestaurantItems = async (id) => {
  try {
    const { data } = await instance.get(`/restaurant/${id}/items`);
    return data;
  } catch (error) {
    console.error(
      `Error fetching items for restaurant ID ${id}:`,
      error.response?.data || error
    );
    throw error;
  }
};

// Get Item Details
const getItemDetails = async (id) => {
  try {
    const { data } = await instance.get(`/item/${id}`);
    return data;
  } catch (error) {
    console.error(
      `Error fetching item with ID ${id}:`,
      error.response?.data || error
    );
    throw error;
  }
};

export {
  register,
  login,
  getProfile,
  getAllCategories,
  getAllRestaurants,
  getRestaurantById,
  getRestaurantItems,
  getItemDetails,
};
