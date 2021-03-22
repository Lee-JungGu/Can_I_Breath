import React, { useRef, useEffect } from "react";
import { Animated, View, Text, StyleSheet } from "react-native";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  AirPollutionInfo,
  MicroAirPollutionInfo,
  WeatherInfo,
} from "./component/WeatherInfo";

export default function AirPollution({
  airPollutionLevel,
  microAirPollutionLevel,
  district,
  temperature,
  weather,
}) {
  const emojiAnim = useRef(new Animated.ValueXY({ x: 0, y: 30 })).current;
  const animateEmoji = Animated.spring(emojiAnim, {
    toValue: { x: 0, y: 0 },
    friction: 2,
    tension: 100,
    useNativeDriver: true,
  });
  const comparePollutionLevel = () => {
    if (
      AirPollutionInfo(airPollutionLevel).gradeNumber >
      MicroAirPollutionInfo(microAirPollutionLevel).gradeNumber
    )
      return AirPollutionInfo(airPollutionLevel);
    else return MicroAirPollutionInfo(microAirPollutionLevel);
  };

  useEffect(() => {
    animateEmoji.start();
  });

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: comparePollutionLevel().baground },
      ]}
    >
      <View style={styles.mainContent}>
        <Text style={styles.district}>({district})</Text>
        <Animated.View style={{ transform: [{ translateY: emojiAnim.y }] }}>
          <FontAwesome5
            name={comparePollutionLevel().emoji}
            style={styles.mainEmoji}
          />
        </Animated.View>
        <Text style={styles.airPollutionGrade}>
          {comparePollutionLevel().grade}
        </Text>
      </View>
      <View style={styles.subText}>
        <Text style={styles.comment}>{comparePollutionLevel().text}</Text>
      </View>
      <View style={styles.weatherContent}>
        <View
          style={[
            styles.weatherBox,
            { backgroundColor: comparePollutionLevel().baground },
          ]}
        >
          <View style={styles.weatherBoxContent}>
            <Text style={styles.weatherBoxTitle}>미세먼지</Text>
            <FontAwesome5
              name={AirPollutionInfo(airPollutionLevel).emoji}
              style={styles.weatherBoxEmoji}
            />
            <Text style={styles.weatherBoxGrade}>
              {AirPollutionInfo(airPollutionLevel).grade}
            </Text>
            <Text style={styles.weatherBoxLevel}>{airPollutionLevel}</Text>
          </View>
          <View style={styles.weatherBoxContent}>
            <Text style={styles.weatherBoxTitle}>초미세먼지</Text>
            <FontAwesome5
              name={MicroAirPollutionInfo(microAirPollutionLevel).emoji}
              style={styles.weatherBoxEmoji}
            />
            <Text style={styles.weatherBoxGrade}>
              {MicroAirPollutionInfo(microAirPollutionLevel).grade}
            </Text>
            <Text style={styles.weatherBoxLevel}>{microAirPollutionLevel}</Text>
          </View>
          <View style={[styles.weatherBoxContent, { borderRightWidth: 0 }]}>
            <Text style={styles.weatherBoxTitle}>날씨</Text>
            <MaterialCommunityIcons
              name={WeatherInfo(weather).emoji}
              style={styles.weatherBoxEmoji}
            />
            <Text style={styles.weatherBoxGrade}>
              {WeatherInfo(weather).weather}
            </Text>
            <Text style={styles.weatherBoxLevel}>{temperature}º</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  mainContent: {
    flex: 3,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  district: {
    fontSize: 20,
    color: "white",
    marginBottom: 20,
  },
  mainEmoji: {
    fontSize: 120,
    color: "white",
    marginBottom: 20,
  },
  airPollutionGrade: {
    fontSize: 30,
    color: "white",
  },

  subText: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  comment: {
    paddingHorizontal: 40,
    fontSize: 24,
    color: "white",
    lineHeight: 30,
  },

  weatherContent: {
    flex: 3,
    alignItems: "center",
  },
  weatherBox: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "84%",
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "white",
  },
  weatherBoxContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderColor: "white",
  },
  weatherBoxTitle: {
    fontSize: 16,
    color: "white",
    marginBottom: 12,
  },
  weatherBoxEmoji: {
    fontSize: 40,
    color: "white",
    marginBottom: 8,
  },
  weatherBoxGrade: {
    fontSize: 15,
    color: "white",
    marginBottom: 8,
  },
  weatherBoxLevel: {
    fontSize: 15,
    color: "white",
  },
});
