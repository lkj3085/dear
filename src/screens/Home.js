import React, { useEffect, useState, useRef } from "react";
import { Text, ActivityIndicator, Animated } from "react-native";
import * as Location from "expo-location";
import { LinearGradient } from "expo-linear-gradient";

const Home = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [nearbyUsers, setNearbyUsers] = useState([]);
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity for animation

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      fetchNearbyUsers(location);
    })();

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const fetchNearbyUsers = async (location) => {
    try {
      const response = await fetch(
        `https://api.example.com/nearby-users?lat=${location.coords.latitude}&lon=${location.coords.longitude}&radius=5`
      );
      const users = await response.json();
      setNearbyUsers(users);
    } catch (error) {
      setErrorMsg("Failed to fetch nearby users");
    }
  };

  return (
    <LinearGradient
      colors={["#f26a50", "#f20042", "#f20045"]}
      style={{ flex: 1 }}
    >
      <Animated.View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          opacity: fadeAnim,
        }}
      >
        {errorMsg ? <Text>{errorMsg}</Text> : null}
        {location ? (
          nearbyUsers.length > 0 ? (
            nearbyUsers.map((user, index) => (
              <Text key={index}>{user.name}</Text>
            ))
          ) : (
            <Text>No users nearby</Text>
          )
        ) : (
          <ActivityIndicator size="large" />
        )}
      </Animated.View>
    </LinearGradient>
  );
};
export default Home;
