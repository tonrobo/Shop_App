import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading"; //is a React component in Expo
import { useFonts } from "expo-font";
import { enableScreens } from "react-native-screens";
import { NavigationContainer } from "@react-navigation/native";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import productsReducer from "./store/reducers/products";
import cartReducer from "./store/reducers/cart";
import ordersReducer from "./store/reducers/orders";
import ShopStack from "./navigation/ShopStack";
import ShopDrawer from "./navigation/ShopDrawer";
// NOTE: USE FOR DEBUGGING:
import { composeWithDevTools } from "redux-devtools-extension";
// DEBUG: RUN IN TERMINAL --> open "rndebugger://set-debugger-loc?host=localhost&port=19000"
import { devToolsEnhancer } from "redux-devtools-extension";

enableScreens();

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
});

const store = createStore(
  rootReducer,
  // NOTE: USE FOR DEBUGGING: //
  composeWithDevTools()
  // DEBUG: RUN IN TERMINAL --> open "rndebugger://set-debugger-loc?host=localhost&port=19000"
);

// NOTE: THIS ALSO WORKED FOR DEBUGGING: //
// DEBUG: RUN IN TERMINAL --> open "rndebugger://set-debugger-loc?host=localhost&port=19000"
// const store = createStore(
//   rootReducer,
//   {},
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

// const fetchFonts = () => {
//   return Font.loadAsync({
//     "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
//     "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
//   });
// };

export default function App() {
  // Applies to loading fonts
  // const [fontLoaded, setFontLoaded] = useState(false); //initially it is false because the font hasn't been loaded.
  // if Fonts are not yet loaded; do a LOADING SCREEN...
  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
    // startAsync={fetchFonts}
    // onFinish={() => setFontLoaded(true)}
  } else {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <ShopDrawer />
        </NavigationContainer>
      </Provider>
    );
  }
}

// const styles = StyleSheet.create({});
