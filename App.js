import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import * as Location from "expo-location";
import axios from "axios";
import Loading from "./Loading";

const API_KEY =
  "R2eFd8GtX8RsVffMn9QKamgFYKlgcEzlGKBImqIWQ9No60kJerbuzqp8Vn%2B44DyxEEVmrlhJyo9yNbQiE1KjFQ%3D%3D";

export default class App extends React.Component {
  state = {
    isLoading: true,
  };

  getAirInfo = async (cityName, district) => {
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
    let AirPollutionLevel = 0;
    for (const item of items) {
      stationName.push(item.stationName);
    }
    // console.log(stationName.includes("보산동"));
    // console.log(stationName[105]);
    if (stationName.includes(district)) {
      const indexOfCity = stationName.indexOf(district);
      AirPollutionLevel = items[indexOfCity].pm10Value;
    } else {
      AirPollutionLevel = items[0].pm10Value;
    }
    console.log(AirPollutionLevel);
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
      console.log(district);
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
    const { isLoading } = this.state;
    return isLoading ? <Loading /> : null;
  }
}
