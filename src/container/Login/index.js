import React, { useState, useContext } from "react";
import { SafeAreaView, Text, View, KeyboardAvoidingView } from "react-native";
import { globalStyle, color } from "../../utility";
import { InputField, Button } from "../../components";
import LottieView from "lottie-react-native";
import { Store } from "../../context/store";
import { LOADING_START } from "../../context/actions/types";

const animation = require("../../annimation/loginannimation.json");

const Login = ({ navigation }) => {
  const globalState = useContext(Store);
  const { dispatchLoaderAction } = globalState;

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { email, password } = credentials;

  const handleOnChange = (name, value) => {
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  onLoginPress = () => {
    if (!email) {
      alert("Email is required");
    } else if (!password) {
      alert("Please, enter a password");
    } else {
      dispatchLoaderAction({
        type: LOADING_START,
      });
    }
  };
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
        <InputField
          placeholder="Enter email"
          value={email}
          onChangeText={(text) => handleOnChange("email", text)}
        />

        <InputField
          placeholder="Enter password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => handleOnChange("password", text)}
        />

        <Button title="Login" onPress={() => onLoginPress()} />
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
