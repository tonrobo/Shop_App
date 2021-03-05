import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import CartItem from "../../models/cart-item";
import { ADD_ORDER } from "../actions/orders";
import { DELETE_PRODUCT } from "../actions/products";
const initialState = {
  items: {}, //these should be objects that describe our product — We need another model!
  totalAmount: 0,
};
export default (state = initialState, action) => {
  //using the initialState, and action
  switch (action.type) {
    case ADD_TO_CART:
      // Ask yourself, in this cart, what do we need to see?
      // The added item (product), the price of that product, the name, and our total
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;

      // Since there is so much in the if statement that is redundant, Max creates some varibles.
      let updatedOrNewCartItem;

      // Find out if this item is already in the cart?
      if (state.items[addedProduct.id]) {
        //we already have this item in our cart, maybe you should update
        const updatedOrNewCartItem = new CartItem( //if we pressed add to cart - we must want another red shirt
          state.items[addedProduct.id].quantity + 1, // quantity
          prodPrice, // price
          prodTitle, // title
          state.items[addedProduct.id].sum + prodPrice // the price of the ones we have + an additional one.
        );
        return {
          ...state,
          items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
          totalAmount: state.totalAmount + prodPrice,
        };
      } else {
        // add new cart item
        const updatedOrNewCartItem = new CartItem(
          1,
          prodPrice,
          prodTitle,
          prodPrice
        ); // sum is the price of 1 prodPrice
        return {
          // here we return a copy of our state (However if our state never changes it, we could skip this.)
          ...state,
          //and set items equal to a new object where we copy all of our existing state items
          items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem }, // and add a new key
          // and add the new product with id (dynamic systex) to our cart as a cart-item
          // Lastly lets deal with the total, since this is a New Add...
          totalAmount: state.totalAmount + prodPrice,
        };
      }
    //add the Remove from cart
    case REMOVE_FROM_CART:
      // Two cases 1. if we only have one of the items, then we need to remove the entire
      // cart item. 2. If we only need to reduce then quantity, then we only need to update the
      // quantity & sum
      // Since we will need the cart item id over and over, we'll store it in a constant.
      const selectedCartItem = state.items[action.pid];
      // console.log(selectedCartItem);
      const currentQty = selectedCartItem.quantity;
      let updatedCartItems;
      if (currentQty > 1) {
        //need to reduce it, not erase it
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.productPrice
        );
        updatedCartItems = { ...state.items, [action.pid]: updatedCartItem };
      } else {
        //we need to erase it
        // we need to return a new items object that includes the old items but doesn't include this item.
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.pid];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.productPrice,
      };
    case ADD_ORDER:
      return initialState; // by returning to the initial state, we empty the cart.

    // *****  This is an PRODUCTS action that removes the product that shopkeeper/admin just
    // deleted from their inventory
    case DELETE_PRODUCT:
      if (!state.items[action.pid]) {
        //if you hit delete and there aren't any of these items in
        // any of the active carts then ignore it and return the initial state (of the items)
        return state;
      } // if the action product id does match an index in the itesm area then...
      const updatedItems = { ...state.items }; // make a copy of the state.items
      const itemTotal = state.items[action.pid].sum; // where did sum come from? The cart-item model
      delete updatedItems[action.pid];
      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotal,
      };
  }
  return state; //in the end the reducer returns a new state to the store (that holds our states)
};

// *** Now we need to start dispatching our actions in the ProductDetail and ProductOverview
