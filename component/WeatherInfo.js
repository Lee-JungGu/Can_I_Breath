const AirPollutionInfo = (airPollutionLevel) => {
  if (airPollutionLevel < 21) {
    return {
      emoji: "smile-beam",
      grade: "아주 좋음",
      gradeNumber: "1",
      baground: "#0099FF",
      text: "매우 상쾌해요~!",
    };
  } else if (airPollutionLevel >= 21 && airPollutionLevel < 51) {
    return {
      emoji: "smile",
      grade: "좋음",
      gradeNumber: "2",
      baground: "#48dbfb",
      text: "밖에 나가기 좋아요~",
    };
  } else if (airPollutionLevel >= 51 && airPollutionLevel < 81) {
    return {
      emoji: "frown",
      grade: "보통",
      gradeNumber: "3",
      baground: "#ff9f43",
      text: "공기가 좋지는 않아요!",
    };
  } else if (airPollutionLevel >= 81 && airPollutionLevel < 151) {
    return {
      emoji: "angry",
      grade: "나쁨",
      gradeNumber: "4",
      baground: "#ee5253",
      text: "마스크 꼭 착용하세요~!",
    };
  } else if (airPollutionLevel >= 151 && airPollutionLevel < 251) {
    return {
      emoji: "skull",
      grade: "매우 나쁨",
      gradeNumber: "5",
      baground: "#576574",
      text: "집콕이 최고!!",
    };
  } else {
    return {
      emoji: "biohazard",
      grade: "최악",
      gradeNumber: "6",
      baground: "#222f3e",
      text: "숨쉬기 힘들어요!!!!!",
    };
  }
};

const MicroAirPollutionInfo = (microAirPollutionLevel) => {
  if (microAirPollutionLevel < 9) {
    return {
      emoji: "smile-beam",
      grade: "아주 좋음",
      gradeNumber: "1",
      baground: "#0099FF",
      text: "매우 상쾌해요~!",
    };
  } else if (microAirPollutionLevel >= 9 && microAirPollutionLevel < 16) {
    return {
      emoji: "smile",
      grade: "좋음",
      gradeNumber: "2",
      baground: "#48dbfb",
      text: "밖에 나가기 좋아요~",
    };
  } else if (microAirPollutionLevel >= 16 && microAirPollutionLevel < 51) {
    return {
      emoji: "frown",
      grade: "보통",
      gradeNumber: "3",
      baground: "#ff9f43",
      text: "공기가 좋지는 않아요!",
    };
  } else if (microAirPollutionLevel >= 51 && microAirPollutionLevel < 101) {
    return {
      emoji: "angry",
      grade: "나쁨",
      gradeNumber: "4",
      baground: "#ee5253",
      text: "마스크 꼭 착용하세요~!",
    };
  } else if (microAirPollutionLevel >= 101 && microAirPollutionLevel < 151) {
    return {
      emoji: "skull",
      grade: "매우 나쁨",
      gradeNumber: "5",
      baground: "#576574",
      text: "집콕이 최고!!",
    };
  } else {
    return {
      emoji: "biohazard",
      grade: "최악",
      gradeNumber: "6",
      baground: "#222f3e",
      text: "숨쉬기 힘들어요!!!!!",
    };
  }
};

const WeatherInfo = (weather) => {
  if (weather === 4201) {
    return {
      weather: "폭우",
      emoji: "weather-pouring",
    };
  } else if (weather === 4001) {
    return {
      weather: "비",
      emoji: "weather-rainy",
    };
  } else if (weather === 4200) {
    return {
      weather: "약한 비",
      emoji: "weather-rainy",
    };
  } else if (weather === 4000) {
    return {
      weather: "약한 비",
      emoji: "weather-rainy",
    };
  } else if (weather === 6201) {
    return {
      weather: "폭우(빙우)",
      emoji: "weather-snowy-rainy",
    };
  } else if (weather === 6001) {
    return {
      weather: "비(빙우)",
      emoji: "weather-snowy-rainy",
    };
  } else if (weather === 6200) {
    return {
      weather: "약한 비(빙우)",
      emoji: "weather-snowy-rainy",
    };
  } else if (weather === 6000) {
    return {
      weather: "약한 비(빙우)",
      emoji: "weather-snowy-rainy",
    };
  } else if (weather === 7101) {
    return {
      weather: "우박(강함)",
      emoji: "weather-hail",
    };
  } else if (weather === 7000) {
    return {
      weather: "우박",
      emoji: "weather-hail",
    };
  } else if (weather === 7102) {
    return {
      weather: "우박(약함)",
      emoji: "weather-hail",
    };
  } else if (weather === 5101) {
    return {
      weather: "폭설",
      emoji: "weather-snowy-heavy",
    };
  } else if (weather === 5000) {
    return {
      weather: "눈",
      emoji: "weather-snowy",
    };
  } else if (weather === 5100) {
    return {
      weather: "약한 눈",
      emoji: "weather-snowy",
    };
  } else if (weather === 5001) {
    return {
      weather: "돌풍",
      emoji: "weather-windy-variant",
    };
  } else if (weather === 8000) {
    return {
      weather: "뇌우",
      emoji: "weather-lightning",
    };
  } else if (weather === 2100) {
    return {
      weather: "약한 안개",
      emoji: "weather-fog",
    };
  } else if (weather === 2000) {
    return {
      weather: "안개",
      emoji: "weather-fog",
    };
  } else if (weather === 1001) {
    return {
      weather: "흐림",
      emoji: "weather-cloudy",
    };
  } else if (weather === 1102) {
    return {
      weather: "대체로 흐림",
      emoji: "weather-cloudy",
    };
  } else if (weather === 1101) {
    return {
      weather: "구름 조금",
      emoji: "weather-partly-cloudy",
    };
  } else if (weather === 1100) {
    return {
      weather: "대체로 맑음",
      emoji: "weather-sunny",
    };
  } else if (weather === 1000) {
    return {
      weather: "맑음",
      emoji: "weather-sunny",
    };
  }
};

export { AirPollutionInfo, MicroAirPollutionInfo, WeatherInfo };
