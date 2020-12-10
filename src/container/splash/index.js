import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { getAsyncStorage, keys } from "../../asyncStorage";
import { globalStyle, color } from "../../utility";
import { setUniqueValue } from "../../utility/constants";
import LottieView from "lottie-react-native";

const animation = require("../../annimation/welcomesplash.json");

const Splash = ({ navigation }) => {
  useEffect(() => {
    const redirect = setTimeout(() => {
      getAsyncStorage(keys.uuid)
        .then((uuid) => {
          if (uuid) {
            setUniqueValue(uuid);
            navigation.replace("Dashboard");
          } else {
            navigation.replace("Login");
          }
        })
        .catch((err) => {
          console.log(err);
          navigation.replace("Login");
        });
    }, 4000);
    return () => clearTimeout(redirect);
  }, [navigation]);
  return (
    <View
      style={[globalStyle.containerCentered, { backgroundColor: color.Black }]}
    >
      {/* add lottie here */}
      <LottieView
        source={animation}
        autoPlay
        style={{ flex: 1 }}
        resizeMode="cover"
      />
    </View>
  );
};

export default Splash;
