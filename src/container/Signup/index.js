import React, { useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { globalStyle, color } from "../../utility";
import { InputField, Button } from "../../components";
import LottieView from "lottie-react-native";

const animation = require("../../annimation/signupannimation.json");

const Signup = ({ navigation }) => {
  const [credentials, setCredentials] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  const { email, password, name, confirmPassword } = credentials;

  const handleOnChange = (name, value) => {
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  onLoginPress = () => {
    if (!name) {
      alert("Your name is required");
    } else if (!email) {
      alert("Email is required");
    } else if (!password) {
      alert("Please, enter a password");
    } else if (password !== confirmPassword) {
      alert("Passwords do  not match");
    } else {
      alert(JSON.stringify(credentials));
    }
  };

  return (
    <SafeAreaView style={[globalStyle.flex1, { backgroundColor: color.BLACK }]}>
      <View style={[globalStyle.containerCentered]}>
        {/* lottie animation should be here */}
        <LottieView
          source={animation}
          autoPlay
          style={{ width: 300, height: 300 }}
          resizeMode="cover"
        />
      </View>

      <View style={[globalStyle.flex2, globalStyle.sectionCentered]}>
        <InputField
          placeholder="Enter name"
          value={name}
          onChangeText={(text) => handleOnChange("name", text)}
        />

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

        <InputField
          placeholder="Confirm password"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={(text) => handleOnChange("confirmPassword", text)}
        />

        <Button title="Login" onPress={() => onLoginPress()} />
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            color: color.LIGHT_GREEN,
          }}
          onPress={() => navigation.navigate("Login")}
        >
          Sign Up
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Signup;
