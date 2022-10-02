import * as React from "react";
import { View, TextInput, StyleSheet, Button } from "react-native";

const Screen1 = ({ navigation }: any) => {
  const { useState, useRef } = React;
  const [countryName, setCountryName] = useState("");
  const [minimumValueError, setMinimumValueError] = useState(true);

  const errorRef = useRef(false);

  const handleButtonPress = () => {
    navigation.push("Screen2", { countryName });
  };

  const handleChange = (value: string) => {
    if (value.length < 3) {
      setMinimumValueError(true);
      errorRef.current = true;
    } else {
      setMinimumValueError(false);
      errorRef.current = false;
    }
    setCountryName(value);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholderTextColor="#000"
        autoFocus={true}
        style={styles.input}
        clearButtonMode="always"
        onChangeText={handleChange}
        placeholder="Enter Country"
        value={countryName}
      />
      <View style={styles.button}>
        <Button
          disabled={minimumValueError}
          onPress={handleButtonPress}
          title="Submit"
        />
      </View>
    </View>
  );
};
export default Screen1;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    color: "black",
    backgroundColor: "white",
    height: 50,
    width: 150,
    borderWidth: 1,
    borderRadius: 6,
  },
  button: {
    width: 100,
    height: 60,
    borderRadius: 5,
    marginTop: 20,
  },
});
