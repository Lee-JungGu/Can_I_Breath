import React, { useRef, useEffect } from "react";
import { Animated, View, Text, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

export default function AirPollution({ airPollutionLevel, district }) {
  const emojiAnim = useRef(new Animated.ValueXY({ x: 0, y: 30 })).current;

  const airInfo = () => {
    if (airPollutionLevel < 20) {
      return {
        emoji: "smile-beam",
        baground: "#0099FF",
        text: "The air is very clean, so if you don't go out, you lose!!",
      };
    } else if (airPollutionLevel >= 20 && airPollutionLevel < 50) {
      return {
        emoji: "smile",
        baground: "#48dbfb",
        text: "The air is clean, so it's okay to go out :)",
      };
    } else if (airPollutionLevel >= 50 && airPollutionLevel < 80) {
      return {
        emoji: "frown",
        baground: "#ff9f43",
        text: "The air is not so good, don't stay outside for a long time :(",
      };
    } else if (airPollutionLevel >= 80 && airPollutionLevel < 100) {
      return {
        emoji: "angry",
        baground: "#ee5253",
        text: "The air is bad, so be sure to wear a mask to get out!",
      };
    } else if (airPollutionLevel >= 100 && airPollutionLevel < 150) {
      return {
        emoji: "skull",
        baground: "#576574",
        text: "The air is very bad, so it’s better not to go out...",
      };
    } else {
      return {
        emoji: "biohazard",
        baground: "#222f3e",
        text:
          "The air is the fuck. Do you want to go outside? Yes it's your life :)",
      };
    }
  };

  const animateEmoji = Animated.spring(emojiAnim, {
    toValue: { x: 0, y: 0 },
    friction: 2,
    tension: 100,
    useNativeDriver: true,
  });

  useEffect(() => {
    animateEmoji.start();
  });

  return (
    <View style={[styles.container, { backgroundColor: airInfo().baground }]}>
      <View style={styles.mainContent}>
        <Animated.View style={{ transform: [{ translateY: emojiAnim.y }] }}>
          <FontAwesome5 name={airInfo().emoji} style={styles.emoji} />
        </Animated.View>
        <Text style={styles.airPollutionLevel}>{airPollutionLevel}</Text>
        <Text style={styles.district}>{district}</Text>
      </View>
      <View style={styles.subContent}>
        <Text style={styles.comment}>{airInfo().text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  mainContent: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  emoji: {
    fontSize: 120,
    marginBottom: 20,
    color: "white",
  },
  airPollutionLevel: {
    fontSize: 40,
    marginBottom: 20,
    color: "white",
  },
  district: {
    fontSize: 20,
    color: "white",
  },

  subContent: {
    flex: 1,
    alignItems: "center",
  },
  comment: {
    paddingHorizontal: 40,
    fontSize: 24,
    color: "white",
    lineHeight: 30,
  },
});
