import React from "react";
import { Alert } from "react-native";
import * as Location from "expo-location";
import axios from "axios";
import Loading from "./Loading";
import AirPollution from "./AirPollution";

const SECRET_KEY = "BoOadcth2YH5h8XP3x5o7XGOd3Bwr42O";

export default class App extends React.Component {
  state = {
    isLoading: true,
    airPollutionLevel: null,
    microAirPollutionLevel: null,
    district: null,
    temperature: null,
    weather: null,
  };

  getWeather = async (latitude, longitude) => {
    try {
      const wheather = await axios(
        `https://data.climacell.co/v4/timelines?location=${latitude},${longitude}&fields=temperature,weatherCode,particulateMatter25,particulateMatter10&timesteps=current&units=metric&apikey=${SECRET_KEY}`
      );
      const {
        data: {
          data: {
            timelines: [
              {
                intervals: [
                  {
                    values: {
                      temperature,
                      weatherCode,
                      particulateMatter25,
                      particulateMatter10,
                    },
                  },
                ],
              },
            ],
          },
        },
      } = wheather;

      this.setState({
        weather: weatherCode,
        temperature: Math.round(temperature),
        airPollutionLevel: Math.round(particulateMatter10),
        microAirPollutionLevel: Math.round(particulateMatter25),
        isLoading: false,
      });
    } catch {
      Alert.alert(
        "날씨정보를 불러오는 중 에러가 발생하였습니다.",
        "앱을 다시 실행해 주세요."
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
      const { city: cityName, district } = city[0];

      if (district != null) this.setState({ district });
      else if (district === null && cityName != null)
        this.setState({ district: cityName });
      else this.setState({ district: "현재 위치" });

      this.getWeather(latitude, longitude);
    } catch {
      Alert.alert(
        "위치정보 승인이 필요합니다.",
        "설정에서 위치정보 승인해 주세요."
      );
    }
  };

  componentDidMount() {
    this.getLocation();
  }

  render() {
    const {
      isLoading,
      airPollutionLevel,
      microAirPollutionLevel,
      district,
      temperature,
      weather,
    } = this.state;
    return isLoading ? (
      <Loading />
    ) : (
      <AirPollution
        airPollutionLevel={airPollutionLevel}
        microAirPollutionLevel={microAirPollutionLevel}
        district={district}
        temperature={temperature}
        weather={weather}
      />
    );
  }
}
