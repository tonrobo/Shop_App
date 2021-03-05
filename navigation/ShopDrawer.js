import * as React from "react";
import { Platform } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import Colors from "../constants/color";
import ShopStack from "./ShopStack";
import OrdersStack from "./OrdersStack";
import AdminStack from "./AdminStack";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// import ShopBottomTabNavigator from "./ShopBottomTabNav.js";

const Drawer = createDrawerNavigator();

const CustomDrawerOptions = {
  activeTintColor: Colors.primary,
  inactiveTintColor: "rgba(150,150,150,0.7)",
  activeBackgroundColor: "rgba(150,150,150,0.1)",
  labelStyle: { fontFamily: "open-sans-bold", fontSize: 16 },
};

const activeColor = CustomDrawerOptions.activeTintColor;
const inactiveColor = CustomDrawerOptions.inactiveTintColor;

// const DrawerCustomIcon = () => {
//   let createIcon = Platform.OS === "android" ? "md-create" : "ios-create";
//   return <Ionicons name={createIcon} size={23} color="black" />;
// };

const ShopDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContentOptions={CustomDrawerOptions}
      drawerStyle={{
        backgroundColor: "#fff",
        opacity: 1,
        width: 220,
      }}
      initialRouteName="Products"
      initialRoute={ProductsOverviewScreen}
    >
      <Drawer.Screen
        name="Shop"
        component={ShopStack}
        options={{
          drawerLabel: "Products",
          drawerIcon: ({ focused }) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
              size={23}
              color={focused ? activeColor : inactiveColor}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Orders"
        component={OrdersStack}
        options={{
          drawerLabel: "Orders",
          drawerIcon: ({ focused }) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-list" : "ios-list"}
              size={23}
              color={focused ? activeColor : inactiveColor}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="User Products"
        component={AdminStack}
        options={{
          drawerLabel: "Admin",
          drawerIcon: ({ focused }) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-create" : "ios-create"}
              size={23}
              color={focused ? activeColor : inactiveColor}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default ShopDrawer;
