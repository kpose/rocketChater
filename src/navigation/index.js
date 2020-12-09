import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { color } from "../utility";
//import screens
import { Login, Signup, Dashboard } from "../container";

const Stack = createStackNavigator();

function NavContainer() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NavContainer;
