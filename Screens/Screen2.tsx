import * as React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { useLayoutEffect } from "react";

const Screen2 = ({ route, navigation }: any) => {
  const { countryName } = route.params;
  const { useLayoutEffect, useState } = React;
  const [wrongCountryError, setwrongCountryError] = useState(false);
  const [countryDetail, setCountryDetail] = useState({
    flags: { png: "https://" },
    capital: "",
    latlng: [0, 0],
    population: "",
  });

  useLayoutEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/name/${countryName}`)
      .then((response) => {
        setCountryDetail(response.data[0]);
      })
      .catch((error) => {
        setwrongCountryError(true);
      });
  }, []);

  return (
    <View>
      {wrongCountryError ? (
        <Text style={styles.errorMessage}>
          Country Name is Invalid!.Please Enter a valid Country Name
        </Text>
      ) : (
        <View>
          <Text style={styles.headingtext}>Country Details</Text>
          <View>
            <Image
              style={styles.imageflag}
              source={{ uri: countryDetail.flags.png }}
            />
          </View>
          <Text style={styles.countrydata}>
            Capital : {countryDetail?.capital}
          </Text>
          <Text style={styles.countrydata}>
            Country's Population : {countryDetail?.population}
          </Text>
          <Text style={styles.countrydata}>
            Latitude : {countryDetail?.latlng[0]}
          </Text>
          <Text style={styles.countrydata}>
            Longitude : {countryDetail?.latlng[1]}
          </Text>
          <View style={styles.button}>
            <Button
              onPress={() => {
                navigation.push("Screen3", { capital: countryDetail.capital });
              }}
              title="Capital Weather"
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default Screen2;

const styles = StyleSheet.create({
  errorMessage: {
    color: "red",
    fontSize: 20,
    margin: 100,
  },
  headingtext: {
    color: "black",
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 105,
  },
  imageflag: {
    width: 250,
    height: 250,
    marginTop: 50,
    marginHorizontal: 40,
  },
  countrydata: {
    color: "black",
    margin: 20,
    fontSize: 16,
    marginLeft: 40,
  },
  button: {
    width: 200,
    marginHorizontal: 90,
    marginTop: 40,
  },
});
