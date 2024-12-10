import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  ScrollView,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../src/api/auth";
import { Ionicons } from "@expo/vector-icons";

const MyProfile = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    staleTime: 0,
  });

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Ionicons name="alert-circle" size={50} color="red" />
        <Text style={styles.errorText}>Failed to load profile data.</Text>
        <Text style={styles.errorMessage}>
          {error.message || "Something went wrong"}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {data ? (
          <View style={styles.card}>
            <View style={styles.headerContainer}>
              <Image
                source={{
                  uri: `https://react-native-food-delivery-be.eapi.joincoded.com/${data.image}`,
                }}
                style={styles.profileImage}
              />
              <View style={styles.headerText}>
                <Text style={styles.title}>{data.username}</Text>
              </View>
            </View>
            <View style={styles.infoContainer}>
              <InfoItem icon="person" label="Username" value={data.username} />
            </View>
          </View>
        ) : (
          <Text style={styles.noDataText}>No profile data available.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <View style={styles.infoItem}>
    <Ionicons name={icon} size={24} color="#007bff" style={styles.infoIcon} />
    <View>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  </View>
);

export default MyProfile;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  infoContainer: {
    marginTop: 10,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  infoIcon: {
    marginRight: 10,
  },
  infoLabel: {
    fontSize: 14,
    color: "#666",
  },
  infoValue: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#007bff",
  },
  errorText: {
    color: "red",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  errorMessage: {
    color: "#666",
    fontSize: 14,
    textAlign: "center",
  },
  noDataText: {
    fontSize: 16,
    color: "#666",
  },
});
