import React from "react";
import { createStackNavigator } from "@react-navigation/stack";


import Product from "../components/Product";
import User from "./User";

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#cd1818",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
  
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="User" component={User} />
      {/* <Stack.Screen name="About" component={About} /> */}
    </Stack.Navigator>
  );
}

const ContactStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Product"  component={Product} />
    </Stack.Navigator>
  );
}

export { MainStackNavigator, ContactStackNavigator };