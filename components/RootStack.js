import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import Splash from "./Splash";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const RootStackk = createStackNavigator();

const RootStack = ({ navigation }) => (
  <RootStackk.Navigator screenOptions={{ headerShown: false }}>
    <RootStackk.Screen
      name="Splash"
      component={Splash}
      options={{ headerShown: false }}
    />
    <RootStackk.Screen
      name="SignIn"
      component={SignIn}
      options={{ headerShown: false }}
    />
    <RootStackk.Screen
      name="SignUp"
      component={SignUp}
      options={{ headerShown: false }}
    />
  </RootStackk.Navigator>
);

export default RootStack;
