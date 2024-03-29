import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  Alert,
  SafeAreaView,
  FlatList,
  Platform,
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { color, globalStyle } from "../../utility";
import { LogOutUser, UpdateUser } from "../../network";
import { clearAsyncStorage } from "../../asyncStorage";
import firebase from "../../firebase/config";
import { LOADING_START, LOADING_STOP } from "../../context/actions/types";
import { uuid } from "../../utility/constants";
import { Profile, ShowUsers } from "../../components";
import { Store } from "../../context/store";
import * as ImagePicker from "expo-image-picker";
//import ImagePicker from "react-native-image-picker";

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

  // profile image picker
  const selectPhotoTapped = async () => {
    if (Platform.OS !== "web") {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      } else {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        if (!result.cancelled) {
          //console.log(result.uri);
          let source = result.uri;
          UpdateUser(uuid, source).then(() => {
            setUserDetail({
              ...userDetail,
              profileImg: source,
            });
          });
        }
      }
    }
  };

  //logout user
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

  //open image
  const imgTap = (profileImg, name) => {
    if (!profileImg) {
      navigation.navigate("ShowFullImg", {
        name,
        imgText: name.charAt(0),
      });
    } else {
      navigation.navigate("ShowFullImg", { name, img: profileImg });
    }
  };

  //name tap to open chat
  const nameTap = (profileImg, name, guestUserId) => {
    if (!profileImg) {
      navigation.navigate("Chat", {
        name,
        imgText: name.charAt(0),
        guestUserId,
        currentUserId: uuid,
      });
    } else {
      navigation.navigate("Chat", {
        name,
        img: profileImg,
        guestUserId,
        currentUserId: uuid,
      });
    }
  };
  return (
    <SafeAreaView style={[globalStyle.flex1, { backgroundColor: color.BLACK }]}>
      <FlatList
        alwaysBounceVertical={false}
        data={allUsers}
        keyExtractor={(_, index) => index.toString()}
        ListHeaderComponent={
          <Profile
            img={profileImg}
            name={name}
            onEditImgTap={selectPhotoTapped}
            onImgTap={() => imgTap(profileImg, name)}
          />
        }
        renderItem={({ item }) => (
          <ShowUsers
            name={item.name}
            img={item.profileImg}
            onImgTap={() => imgTap(item.profileImg, item.name)}
            onNameTap={() => nameTap(item.profileImg, item.name, item.id)}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Dashboard;
