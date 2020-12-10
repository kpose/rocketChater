import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { color } from "../utility";
//import screens
import {
  Login,
  Signup,
  Dashboard,
  Splash,
  ShowFullImg,
  Chat,
} from "../container";

const Stack = createStackNavigator();

function NavContainer() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash" //change this back to "splash" after build
        screenOptions={{
          headerShown: true,
          headerStyle: { backgroundColor: color.DARK_GRAY },
          headerTintColor: color.WHITE,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
          },
        }}
      >
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ headerLeft: null }}
        />
        <Stack.Screen
          name="ShowFullImg"
          component={ShowFullImg}
          options={{ headerBackTitle: null }}
        />

        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{ headerBackTitle: null }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NavContainer;
