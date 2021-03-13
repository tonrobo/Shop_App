import React from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/color";
import CartItem from "../../components/shop/CartItem";
import * as cartActions from "../../store/actions/cart";
import * as ordersActions from "../../store/actions/orders";
import OrdersStack from "../../navigation/OrdersStack";
import Card from "../../components/UI/Card";

const CartScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  // NOTE: THIS RETURNS AN OBJECT, BUT AN ARRAY IS BETTER....
  // const cartItems = useSelector((state) => state.cart.items);
  const cartItems = useSelector((state) => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });
  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{" "}
          <Text style={styles.amount}>
            ${Math.abs(cartTotalAmount.toFixed(2))}
          </Text>
        </Text>
        <Button
          color={Colors.accent}
          title="Order Now"
          disabled={cartItems.length === 0}
          onPress={() => {
            dispatch(ordersActions.addOrder(cartItems, cartTotalAmount));
            navigation.navigate("OrdersScreen");
          }}
        />
      </Card>
      <View>
        {/* in the future this will be a flatlist of items */}
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.productId}
          renderItem={(itemData) => (
            <CartItem
              quantity={itemData.item.quantity}
              title={itemData.item.productTitle}
              amount={itemData.item.sum}
              deletable
              onRemove={() => {
                dispatch(cartActions.removeFromCart(itemData.item.productId));
              }}
            />
          )} //renderCartItem (and I set up a function to return cartItem?)
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  amount: { color: Colors.primary },
});

export default CartScreen;
