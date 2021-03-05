import React from "react";
import { Platform, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ShopStack from "./ShopStack";
import ShopDrawer from "./ShopDrawer";

import Colors from "../constants/color";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

const Tab =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator()
    : createBottomTabNavigator();

const ShopBottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Shop"
      activeColor="white"
      shifting={true}
      barStyle={{ backgroundColor: Colors.primaryColor }}
      tabBarOptions={{
        labelStyle: {
          fontFamily: "open-sans-bold",
        },
        activeTintColor: Colors.accentColor,
        // style: { height: 95, justifyContent: "center", paddingTop: 10 },
      }}
    >
      <Tab.Screen name="Shop!" component={ShopStack} />
      {/* <Tab.Screen name="" component={} option={} /> */}
    </Tab.Navigator>
  );
};

export default ShopBottomTabNavigator;
