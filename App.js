import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import * as Location from "expo-location";
import axios from "axios";
import Loading from "./Loading";
import AirPollution from "./AirPollution";

const API_KEY =
  "R2eFd8GtX8RsVffMn9QKamgFYKlgcEzlGKBImqIWQ9No60kJerbuzqp8Vn%2B44DyxEEVmrlhJyo9yNbQiE1KjFQ%3D%3D";

export default class App extends React.Component {
  state = {
    isLoading: true,
    airPollutionLevel: null,
    district: null,
  };

  getAirInfo = async (cityName, district) => {
    try {
      const airInfo = await axios(
        `http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=${API_KEY}&returnType=json&numOfRows=200&pageNo=1&sidoName=${cityName}&ver=1.0`
      );
      const {
        data: {
          response: {
            body: { items },
          },
        },
      } = airInfo;

      let stationName = [];
      let airPollutionLevel = 0;

      for (const item of items) {
        stationName.push(item.stationName);
      }

      if (stationName.includes(district)) {
        const indexOfCity = stationName.indexOf(district);
        airPollutionLevel = items[indexOfCity].pm10Value;
      } else {
        airPollutionLevel = items[0].pm10Value;
      }

      this.setState({ airPollutionLevel });

      if (district != null) {
        this.setState({ district });
      } else {
        this.setState({ district: "현재 위치" });
      }

      this.setState({ isLoading: false });
    } catch {
      Alert.alert(
        "Could you please approve the location information?",
        "Please..."
      );
    }
  };

  getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();
      const location = await Location.getCurrentPositionAsync();
      const {
        coords: { latitude, longitude },
      } = location;
      const city = await Location.reverseGeocodeAsync({ latitude, longitude });
      const { region, district } = city[0];
      const cityName = encodeURI(region.slice(0, 2));
      this.getAirInfo(cityName, district);
    } catch {
      Alert.alert(
        "Could you please approve the location information?",
        "Please..."
      );
    }
  };

  componentDidMount() {
    this.getLocation();
  }

  render() {
    const { isLoading, airPollutionLevel, district } = this.state;
    return isLoading ? (
      <Loading />
    ) : (
      <AirPollution airPollutionLevel={airPollutionLevel} district={district} />
    );
  }
}
