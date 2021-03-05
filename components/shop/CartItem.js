import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/color";

const CartItem = (props) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>{props.quantity} </Text>
        <Text style={styles.mainText}>{props.title}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>${props.amount.toFixed(2)}</Text>
        {/* When we are using this for our cart, we want to be able to delete items, but if we are using this
        as the details in our Order, then we don't want it to be interactive (read only), so we don't want
        to show a delete button. So if the prop "deletable" is true then display the button */}
        {props.deletable && (
          <TouchableOpacity
            onPress={props.onRemove}
            style={styles.deleteButton}
          >
            <Ionicons
              name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
              size={18}
              color="red"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    paddingVertical: 10,
    // backgroundColor: "none",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 5,
    // marginVertical: 5,
  },
  itemData: {
    flexDirection: "row",
    alignItems: "flex-start",
    textAlign: "left",
  },
  quantity: {
    fontFamily: "open-sans-bold",
    color: "#888",
    fontSize: 16,
    padding: 2,
    justifyContent: "flex-start",
    textAlign: "left",
    marginRight: 10,
  },
  mainText: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
    textAlign: "left",
    justifyContent: "flex-start",
    alignContent: "flex-start",
    // marginHorizontal: 15,
  },
  deleteButton: {
    marginLeft: 20,
  },
});

export default CartItem;
