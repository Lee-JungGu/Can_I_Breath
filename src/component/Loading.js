import React, { useRef, useEffect } from "react";
import { Animated, StyleSheet, View, Text } from "react-native";

export default function Loading() {
  const fadeAnim = useRef(new Animated.Value(0.2)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const fadeIn = Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 1000,
    useNativeDriver: true,
  });

  const fadeOut = Animated.timing(fadeAnim, {
    toValue: 0.2,
    duration: 1000,
    useNativeDriver: true,
  });

  const scaleUp = Animated.timing(scaleAnim, {
    toValue: 1.2,
    duration: 1000,
    useNativeDriver: true,
  });

  const scaleDown = Animated.timing(scaleAnim, {
    toValue: 1,
    duration: 1000,
    useNativeDriver: true,
  });

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.parallel([fadeIn, scaleUp]),
        Animated.parallel([fadeOut, scaleDown]),
      ])
    ).start();
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}
      >
        <Text style={styles.text}>Can I breath...?</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fdcb6e",
  },
  text: {
    fontSize: 18,
    color: "#636e72",
  },
});
