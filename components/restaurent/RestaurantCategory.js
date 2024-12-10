import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

const RestaurantCategory = ({
  categories,
  selectedCategory,
  onCategoryPress,
}) => {
  return (
    <FlatList
      data={categories}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item._id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => onCategoryPress(item.name)}
          style={[
            styles.categoryContainer,
            selectedCategory === item.name && styles.selectedCategory,
          ]}
        >
          <Image
            source={{ uri: item.image }}
            style={styles.categoryImage}
            resizeMode="contain"
          />
          <Text style={styles.categoryText}>{item.name}</Text>
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
