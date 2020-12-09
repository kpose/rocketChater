import React from "react";
import { SafeAreaView, Text } from "react-native";

const Signup = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Text onPress={() => navigation.navigate("Dashboard")}>sign up</Text>
    </SafeAreaView>
  );
};

export default Signup;
