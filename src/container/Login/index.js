import React, { useState, useContext } from "react";
import {
  SafeAreaView,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from "react-native";
import { globalStyle, color } from "../../utility";
import { InputField, Button } from "../../components";
import LottieView from "lottie-react-native";
import { Store } from "../../context/store";
import { LOADING_START, LOADING_STOP } from "../../context/actions/types";
import { LoginRequest } from "../../network";
import { keys, setAsyncStorage } from "../../asyncStorage";
import {
  setUniqueValue,
  keyboardVerticalOffset,
} from "../../utility/constants";

const animation = require("../../annimation/loginannimation.json");

const Login = ({ navigation }) => {
  const globalState = useContext(Store);
  const { dispatchLoaderAction } = globalState;

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [showAnmie, toggleAnmie] = useState(true);

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
      LoginRequest(email, password)
        .then((res) => {
          if (!res.additionalUserInfo) {
            dispatchLoaderAction({
              type: LOADING_STOP,
            });
            alert(res);
            return;
          }
          setAsyncStorage(keys.uuid, res.user.uid);
          setUniqueValue(res.user.uid);
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
          navigation.replace("Dashboard");
        })
        .catch((error) => {
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
          alert(error);
        });
    }
  };

  const handleFocus = () => {
    setTimeout(() => {
      toggleAnmie(false);
    }, 2000);
  };

  const handleBlur = () => {
    setTimeout(() => {
      toggleAnmie(true);
    }, 200);
  };
  return (
    <KeyboardAvoidingView
      style={[globalStyle.flex1, { backgroundColor: color.BLACK }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView
          style={[globalStyle.flex1, { backgroundColor: color.BLACK }]}
        >
          <View style={[globalStyle.containerCentered]}>
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
              onFocus={() => handleFocus()}
              onBlur={() => handleBlur()}
            />

            <InputField
              placeholder="Enter password"
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => handleOnChange("password", text)}
              onFocus={() => handleFocus()}
              onBlur={() => handleBlur()}
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
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;
