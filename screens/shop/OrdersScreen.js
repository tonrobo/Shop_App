import React from "react";
import { Text, FlatList, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import OrderItem from "../../components/shop/OrderItem";

// My logic for this page should be:
// 1. If there is an order, check if it's a duplicate. If there is NO order, tell the user they do not have any orders
// in progress. If it's a new order, add to order state.

const OrdersScreen = (props) => {
  const orders = useSelector((state) => state.orders.orders);
  const list = (
    <FlatList
      data={orders}
      keyExtractor={(items) => items.id}
      renderItem={(itemData) => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
    />
  );
  if (orders.length <= 0) {
    return (
      <View style={styles.middle}>
        <Text>
          You have not placed any orders.{"\n"}
          {"\n"}
          What are you waiting for?
        </Text>
      </View>
    );
  } else {
    return list;
  }
};
const styles = StyleSheet.create({
  middle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
    marginTop: "30%",
  },
});
export default OrdersScreen;
