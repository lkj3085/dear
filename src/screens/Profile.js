import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Image, Animated } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const Profile = () => {
  const scaleAnim = useRef(new Animated.Value(0)).current; // Initial value for scale: 0
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }).start();
    } else {
      scaleAnim.setValue(0);
    }
  }, [isFocused, scaleAnim]);

  return (
    <LinearGradient
      colors={["#f26a50", "#f20042", "#f20045"]}
      style={styles.gradient}
    >
      <Animated.View
        style={[styles.container, { transform: [{ scale: scaleAnim }] }]}
      >
        <Image
          source={{ uri: "https://example.com/profile.jpg" }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>김철수</Text>
        <Text style={styles.description}>
          열정적인 개발자이자 여행을 사랑하는 사람
        </Text>
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>나이:</Text>
          <Text style={styles.infoContent}>30</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>취미:</Text>
          <Text style={styles.infoContent}>코딩, 등산, 독서</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>꿈:</Text>
          <Text style={styles.infoContent}>세계 일주</Text>
        </View>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9f9f9",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  infoContent: {
    fontSize: 16,
    color: "#666",
    marginLeft: 5,
  },
});

export default Profile;
