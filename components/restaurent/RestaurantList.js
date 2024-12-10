import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const RestaurantList = ({ restaurants }) => {
  const navigation = useNavigation();

  const renderRatingStars = (rating) => (
    <View style={styles.ratingContainer}>
      <Text style={styles.starIcon}>⭐</Text>
      <Text style={styles.ratingText}>{rating}</Text>
    </View>
  );

  return (
    <FlatList
      style={{ height: "75%" }}
      data={restaurants}
      keyExtractor={(item) => item._id.toString()}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.cardShadow}
          onPress={() => {
            console.log("Navigating with restaurantId:", item._id);
            navigation.navigate("Menu", { restaurantId: item._id });
          }}
          activeOpacity={0.7}
        >
          <View style={styles.restaurantContainer}>
            <Image
              source={{ uri: item.image }}
              style={styles.restaurantImage}
              resizeMode="cover"
            />
            <View style={styles.restaurantDetails}>
              <Text style={styles.restaurantName}>{item.name}</Text>
              <View style={styles.infoRow}>
                {renderRatingStars(item.rating)}
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.restaurantCategory}>
                  {item.category?.name}
                </Text>
              </View>
              <View style={styles.deliveryContainer}>
                <Text style={styles.deliveryTime}>🕒 {item.deliveryTime}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default RestaurantList;

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  cardShadow: {
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  restaurantContainer: {
    flexDirection: "row",
    overflow: "hidden",
    borderRadius: 12,
  },
  restaurantImage: {
    width: width * 0.25,
    height: width * 0.25,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  restaurantDetails: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 6,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  starIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFB800",
  },
  bulletPoint: {
    marginHorizontal: 8,
    color: "#C5C5C5",
  },
  restaurantCategory: {
    fontSize: 14,
    color: "#666666",
    fontWeight: "500",
  },
  deliveryContainer: {
    marginTop: 4,
  },
  deliveryTime: {
    fontSize: 13,
    color: "#666666",
    fontWeight: "500",
  },
});
