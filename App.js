import React from "react";
import { Alert } from "react-native";
import * as Location from "expo-location";
import axios from "axios";
import Loading from "./Loading";
import AirPollution from "./AirPollution";

const API_KEY =
  "R2eFd8GtX8RsVffMn9QKamgFYKlgcEzlGKBImqIWQ9No60kJerbuzqp8Vn%2B44DyxEEVmrlhJyo9yNbQiE1KjFQ%3D%3D";
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

      // if (weatherCode === 4201) this.setState({ weather: "폭우" });
      // else if (weatherCode === 4001) this.setState({ weather: "비" });
      // else if (weatherCode === 4200) this.setState({ weather: "소우" });
      // else if (weatherCode === 4000) this.setState({ weather: "소우" });
      // else if (weatherCode === 6201) this.setState({ weather: "폭우(빙우)" });
      // else if (weatherCode === 6001) this.setState({ weather: "비(빙우)" });
      // else if (weatherCode === 6200) this.setState({ weather: "소우(빙우)" });
      // else if (weatherCode === 6000) this.setState({ weather: "이슬비(빙우)" });
      // else if (weatherCode === 7101) this.setState({ weather: "우박(강함)" });
      // else if (weatherCode === 7000) this.setState({ weather: "우박" });
      // else if (weatherCode === 7102) this.setState({ weather: "우박(약함)" });
      // else if (weatherCode === 5101) this.setState({ weather: "폭설" });
      // else if (weatherCode === 5000) this.setState({ weather: "눈" });
      // else if (weatherCode === 5100) this.setState({ weather: "약한 눈" });
      // else if (weatherCode === 5001) this.setState({ weather: "소나기" });
      // else if (weatherCode === 8000) this.setState({ weather: "뇌우" });
      // else if (weatherCode === 2100) this.setState({ weather: "약한 안개" });
      // else if (weatherCode === 2000) this.setState({ weather: "안개" });
      // else if (weatherCode === 1001) this.setState({ weather: "흐림" });
      // else if (weatherCode === 1102) this.setState({ weather: "대체로 흐림" });
      // else if (weatherCode === 1101) this.setState({ weather: "구름 조금" });
      // else if (weatherCode === 1100) this.setState({ weather: "대체로 맑음" });
      // else if (weatherCode === 1000) this.setState({ weather: "맑음" });

      this.setState({
        weather: weatherCode,
        temperature: Math.round(temperature),
        airPollutionLevel: particulateMatter10,
        microAirPollutionLevel: particulateMatter25,
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
      const { district } = city[0];
      if (district != null) this.setState({ district });
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
