import * as React from "react";
import { Platform } from "react-native";
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import Colors from "../constants/color";

import OrdersScreen from "../screens/shop/OrdersScreen";
import {
  MaterialHeaderButton,
  IosHeaderButton,
} from "../components/UI/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

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

const OrdersStack = ({ navigation }) => {
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
        name="Filters"
        component={OrdersScreen}
        options={({ navigation }) => ({
          title: "Order in Progress (in Stack)",
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
        })}
      />
    </Stack.Navigator>
  );
};

export default OrdersStack;
