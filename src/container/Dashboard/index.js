import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { View, Text, Alert, SafeAreaView, FlatList } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { color, globalStyle } from "../../utility";
import { LogOutUser } from "../../network";
import { clearAsyncStorage } from "../../asyncStorage";
import firebase from "../../firebase/config";
import { LOADING_START, LOADING_STOP } from "../../context/actions/types";
import { uuid } from "../../utility/constants";
import { Profile, ShowUsers } from "../../components";
import { Store } from "../../context/store";

const Dashboard = ({ navigation }) => {
  const globalState = useContext(Store);
  const { dispatchLoaderAction } = globalState;

  const [userDetail, setUserDetail] = useState({
    id: "",
    name: "",
    profileImg: "",
  });
  const { name, profileImg } = userDetail;
  const [allUsers, setAllUsers] = useState([]);

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

  useEffect(() => {
    dispatchLoaderAction({
      type: LOADING_START,
    });
    try {
      firebase
        .database()
        .ref("users")
        .on("value", (dataSnapShot) => {
          let users = [];
          let currentUser = {
            id: "",
            name: "",
            profileImg: "",
          };
          dataSnapShot.forEach((child) => {
            if (uuid === child.val().uuid) {
              currentUser.id = uuid;
              currentUser.name = child.val().name;
              currentUser.profileImg = child.val().profileImg;
            } else {
              users.push({
                id: child.val().uuid,
                name: child.val().name,
                profileImg: child.val().profileImg,
              });
            }
          });
          setAllUsers(users);
          setUserDetail(currentUser);
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
        });
    } catch (error) {
      dispatchLoaderAction({
        type: LOADING_STOP,
      });
      alert(error);
    }
  }, []);

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
    <SafeAreaView style={[globalStyle.flex1, { backgroundColor: color.BLACK }]}>
      <FlatList
        alwaysBounceVertical={false}
        data={allUsers}
        keyExtractor={(_, index) => index.toString()}
        ListHeaderComponent={<Profile img={profileImg} name={name} />}
        renderItem={({ item }) => (
          <ShowUsers name={item.name} img={item.profileImg} />
        )}
      />
    </SafeAreaView>
  );
};

export default Dashboard;
