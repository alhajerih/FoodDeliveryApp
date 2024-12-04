import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const RestaurantCategory = ({
  categories,
  selectedCategory,
  onCategoryPress,
}) => {
  return (
    <FlatList
      data={categories}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => onCategoryPress(item.categoryName)}
          style={[
            styles.categoryContainer,
            selectedCategory === item.categoryName && styles.selectedCategory,
          ]}
        >
          <Image
            source={{ uri: item.categoryImage }}
            style={styles.categoryImage}
            resizeMode="contain"
          />
          <Text style={styles.categoryText}>{item.categoryName}</Text>
        </TouchableOpacity>
      )}
      horizontal
      contentContainerStyle={styles.categoriesList}
    />
  );
};

export default RestaurantCategory;

const styles = StyleSheet.create({
  categoriesList: {
    // flex: 1,
    paddingVertical: 10,
    marginBottom: 30,
  },
  categoryContainer: {
    alignItems: "center",
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 30,
  },
  selectedCategory: {
    flex: 1,
    borderColor: "#007bff",
    borderWidth: 2,
  },
  categoryImage: {
    width: 80,
    height: 80,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
    textAlign: "center",
  },
});
