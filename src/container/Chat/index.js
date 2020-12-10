import React, { useLayoutEffect } from "react";
import { View, Text, SafeAreaView, FlatList } from "react-native";
import { globalStyle, color, appStyle } from "../../utility";
import styles from "./styles";
import { InputField } from "../../components";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Chat = ({ route, navigation }) => {
  const { params } = route;
  const { name, img, imgText, guestUserId, currentUserId } = params;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: <Text>{name}</Text>,
    });
    return () => {
      cleanup;
    };
  }, [navigation]);
  return (
    <SafeAreaView style={[globalStyle.flex1, { backgroundColor: color.BLACK }]}>
      <FlatList
        inverted
        data={[1, 2, 3, 4]}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <Text>{name}</Text>}
      />

      {/* send message */}
      <View style={styles.sendMessageContainer}>
        <InputField
          placeholder="Type message here"
          numberOfLines={10}
          inputStyle={styles.input}
        />

        <View style={styles.sendBtnContainer}>
          <MaterialCommunityIcons
            name="camera"
            color={color.WHITE}
            size={appStyle.fieldHeight}
          />
          <MaterialCommunityIcons
            name="send-circle"
            color={color.WHITE}
            size={appStyle.fieldHeight}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Chat;
