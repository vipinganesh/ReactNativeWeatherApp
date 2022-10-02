import * as React from "react";
import { Image, Text, View, StyleSheet } from "react-native";
import axios from "axios";

const Screen3 = ({ navigation, route }: any) => {
  const { capital } = route.params;
  const { useLayoutEffect, useState } = React;
  const [countryDetail, setCountryDetail] = useState({
    current: {
      weather_icons: ["https://"],
      temperature: "",
      precip: "",
      wind_speed: "",
    },
  });

  useLayoutEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=71291c4879b89a0296db33b742bcef12&query=${capital}`
      )
      .then((response) => {
        setCountryDetail(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <View>
      <Text style={styles.heading}>Weather Details</Text>
      <Image
        style={styles.weatherimage}
        source={{ uri: countryDetail?.current.weather_icons[0] }}
      />
      <Text style={styles.weatherdata}>
        Temperature : {countryDetail?.current.temperature} &#176;C
      </Text>
      <Text style={styles.weatherdata}>
        Precipitation : {countryDetail?.current.precip}%
      </Text>
      <Text style={styles.weatherdata}>
        Wind Speed : {countryDetail?.current.wind_speed} MPH
      </Text>
    </View>
  );
};
export default Screen3;

const styles = StyleSheet.create({
  heading: {
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 30,
    marginLeft: 110,
  },
  weatherimage: {
    width: 120,
    height: 120,
    marginTop: 130,
    marginHorizontal: 40,
    marginBottom: 40,
  },
  weatherdata: {
    color: "black",
    margin: 20,
    fontSize: 16,
    marginLeft: 40,
  },
});
