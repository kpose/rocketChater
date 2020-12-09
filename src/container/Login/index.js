import { View } from "native-base";
import React from "react";
import { SafeAreaView, Text } from "react-native";
import { globalStyle, color } from "../../utility";
import { InputField, Button } from "../../components";
import LottieView from "lottie-react-native";

const animation = require("../../annimation/chatlogo.json");

const Login = ({ navigation }) => {
  return (
    <SafeAreaView style={[globalStyle.flex1, { backgroundColor: color.BLACK }]}>
      <View style={[globalStyle.containerCentered]}>
        {/* lottie animation should be here */}
        <LottieView
          source={animation}
          autoPlay
          style={{ width: 200, height: 250 }}
          resizeMode="cover"
        />
      </View>

      <View style={[globalStyle.flex2, globalStyle.sectionCentered]}>
        <InputField placeholder="Enter email" />
        <InputField placeholder="Enter password" />
        <Button title="Login" />
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            color: color.LIGHT_GREEN,
          }}
          onPress={() => navigation.navigate("Signup")}
        >
          Sign Up
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Login;
