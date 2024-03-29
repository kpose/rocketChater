import React, { useContext, useState } from "react";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  SafeAreaView,
  Text,
  View,
  Keyboard,
} from "react-native";
import { globalStyle, color } from "../../utility";
import { InputField, Button } from "../../components";
import LottieView from "lottie-react-native";
import { Store } from "../../context/store";
import { LOADING_START, LOADING_STOP } from "../../context/actions/types";
import { SignUpRequest, AddUser } from "../../network";
import { keys, setAsyncStorage } from "../../asyncStorage";
import {
  setUniqueValue,
  keyboardVerticalOffset,
} from "../../utility/constants";
import firebase from "../../firebase/config";

const animation = require("../../annimation/signupannimation.json");

const Signup = ({ navigation }) => {
  const globalState = useContext(Store);
  const { dispatchLoaderAction } = globalState;
  const [credentials, setCredentials] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [showAnmie, toggleAnmie] = useState(true);

  const { email, password, name, confirmPassword } = credentials;

  const handleOnChange = (name, value) => {
    setCredentials({
      ...credentials,
      [name]: value,
    });
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

  const onSignupPress = () => {
    if (!name) {
      alert("Your name is required");
    } else if (!email) {
      alert("Email is required");
    } else if (!password) {
      alert("Please, enter a password");
    } else if (password !== confirmPassword) {
      alert("Passwords do  not match");
    } else {
      dispatchLoaderAction({
        type: LOADING_START,
      });
      SignUpRequest(email, password)
        .then((res) => {
          if (!res.additionalUserInfo) {
            dispatchLoaderAction({
              type: LOADING_STOP,
            });
            alert(res);
            return;
          }
          //console.log(firebase.auth().currentUser.uid);
          let uid = firebase.auth().currentUser.uid;
          let profileImg = "";
          AddUser(name, email, uid, profileImg)
            .then(() => {
              setAsyncStorage(keys.uuid, uid);
              setUniqueValue(uid);
              dispatchLoaderAction({
                type: LOADING_STOP,
              });
              navigation.replace("Dashboard");
            })
            .catch((err) => {
              dispatchLoaderAction({
                type: LOADING_STOP,
              });
              alert(err);
            });
        })
        .catch((error) => {
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
          alert(error);
        });
    }
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
              onFocus={() => handleFocus()}
              onBlur={() => handleBlur()}
            />

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

            <InputField
              placeholder="Confirm password"
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={(text) => handleOnChange("confirmPassword", text)}
              onFocus={() => handleFocus()}
              onBlur={() => handleBlur()}
            />

            <Button title="Sign Up" onPress={() => onSignupPress()} />
            <Text
              style={{
                fontSize: 28,
                fontWeight: "bold",
                color: color.LIGHT_GREEN,
              }}
              onPress={() => navigation.navigate("Login")}
            >
              Login
            </Text>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Signup;
