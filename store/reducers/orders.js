import { ADD_ORDER } from "../actions/orders";
import Order from "../../models/order";

// Max said to clear the cart in the cart reducer by creating an ADD-ORDER to the cart reducer.

const initialState = {
  // will the order show the items?
  // There needs to be a total + shipping These questions mean we have to create a model for Order.
  // The customer will need an area to add their payment and info, maybe set up an accnt.
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const newOrder = new Order(
        // create a new date with vanilla js, then extract
        // the values using the properties of the Orders model
        new Date().toString(),
        action.orderData.items,
        action.orderData.amount,
        new Date()
      ); // psuedo data - We're going to use the date as the Id.

      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };
  }
  return state;
};
