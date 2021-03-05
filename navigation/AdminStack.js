import * as React from "react";
import { Platform } from "react-native";
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import Colors from "../constants/color";

import UserProductsScreen from "../screens/user/UserProductsScreen";
import {
  MaterialHeaderButton,
  IosHeaderButton,
} from "../components/UI/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import EditProductsScreen from "../screens/user/EditProductsScreen";

const Stack = createStackNavigator();
const HeaderStackScreenOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const AdminStack = () => {
  const myHeaderButton =
    Platform.OS === "android" ? MaterialHeaderButton : IosHeaderButton;
  return (
    <Stack.Navigator
      initialRouteName="Orders"
      mode="card" // The default is card
      headerMode="screen" //The default is float
      screenOptions={HeaderStackScreenOptions}
    >
      <Stack.Screen
        name="Admin"
        component={UserProductsScreen}
        options={({ navigation }) => ({
          title: "Your Products",
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={myHeaderButton}>
              <Item
                title="Menu"
                iconName={Platform.OS === "android" ? "menu" : "ios-menu"}
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          ),
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={myHeaderButton}>
              <Item
                title="Add"
                iconName={
                  Platform.OS === "android" ? "pencil-plus" : "ios-create"
                } //left off Friday PM problem with icon.
                onPress={() => {
                  navigation.navigate("EditProduct");
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
      <Stack.Screen
        name="EditProduct"
        component={EditProductsScreen}
        options={({ route }) => ({
          headerTitle: route.params ? "Edit Product" : "Add Product",
          headerBackTitle: "Back",
        })}
      />
    </Stack.Navigator>
  );
};

export default AdminStack;
