import * as React from "react";
import { Platform } from "react-native";
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import Colors from "../constants/color";

import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductsScreen from "../screens/user/EditProductsScreen";

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

const ShopStack = ({ navigation }) => {
  const myHeaderButton =
    Platform.OS === "android" ? MaterialHeaderButton : IosHeaderButton;
  return (
    <Stack.Navigator
      initialRouteName="ProductsOverviewScreen"
      mode="card"
      headerMode="screen"
      screenOptions={HeaderStackScreenOptions}
    >
      <Stack.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={() => ({
          title: "All Products",
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
          headerBackTitle: "Back",
        })}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={({ route }) => ({
          title: route.params.productTitle,
        })}
      />
      <Stack.Screen
        name="ShoppingCart"
        component={CartScreen}
        options={{ headerTitle: "Shopping Cart" }}
      />
      <Stack.Screen
        name="OrdersScreen"
        component={OrdersScreen}
        options={{
          headerTitle: "Orders in Progress",
        }}
      />
      {/* <Stack.Screen
        name="UserProductsScreen"
        component={UserProductsScreen}
        options={{
          headerTitle: "User Products",
        }}
      /> */}
      {/* <Stack.Screen
        name="EditProduct"
        component={EditProductsScreen}
        options={{
          headerTitle: "Product to Edit",
        }}
      /> */}
    </Stack.Navigator>
  );
};
export default ShopStack;
