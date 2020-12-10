import React, { useLayoutEffect } from "react";
import { View, Text, Alert } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { color } from "../../utility";
import { LogOutUser } from "../../network";
import { clearAsyncStorage } from "../../asyncStorage";

const Dashboard = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <SimpleLineIcons
          name="logout"
          size={26}
          color={color.WHITE}
          style={{ right: 10 }}
          onPress={() =>
            Alert.alert(
              "Logout",
              "Are you sure to log out",
              [
                {
                  text: "Yes",
                  onPress: () => logout(),
                },
                {
                  text: "No",
                },
              ],
              { cancelable: false }
            )
          }
        />
      ),
    });
  }, [navigation]);

  const logout = () => {
    LogOutUser()
      .then(() => {
        clearAsyncStorage()
          .then(() => {
            navigation.replace("Login");
          })
          .catch((error) => alert(error));
      })
      .catch((error) => alert(error));
  };
  return (
    <View>
      <Text>Dashboard</Text>
    </View>
  );
};

export default Dashboard;
