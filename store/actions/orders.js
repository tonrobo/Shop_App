export const ADD_ORDER = "ADD_ORDER";

export const addOrder = (cartItems, totalAmount) => {
  // here in the action order, we return our new action object, it has a type which is add order,
  // and holds the orderData as an object with the keys for merged cartItems, and the total amount.
  return {
    type: ADD_ORDER,
    orderData: { items: cartItems, amount: totalAmount },
  };
};
