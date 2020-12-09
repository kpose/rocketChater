import React, { useLayoutEffect } from "react";
import { View, Text, Alert } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { color } from "../../utility";

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
                  onPress: () => alert("user logged out"),
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
  return (
    <View>
      <Text>Dashboard</Text>
    </View>
  );
};

export default Dashboard;
