import PRODUCTS from "../../data/dummy-data";
import Product from "../../models/product";
import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
} from "../actions/products";

// 1. Begin by defining your initial state.
const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === "u1"),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PRODUCT:
      const newProduct = new Product(
        new Date().toString(),
        "u1",
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price
      );
    case UPDATE_PRODUCT:
    case DELETE_PRODUCT:
      return {
        ...state,
        // Filter will run every item in the array and if it returns
        // true we keep the item, and if it returns false we omit that
        // item. So, if the item DOES NOT (!==) match the action.pid (product.id)
        // then we keep the product.
        userProducts: state.userProducts.filter(
          (product) => product.id !== action.pid
        ),
        // Now, we have to remove this from the availableProducts (which
        // are the products in the customer facing side of the store.)
        availableProducts: state.availableProducts.filter(
          (product) => product.id !== action.pid
        ),
        // But now this product deletion could be a problem for the Customer
        // that currently has this product in their cart.
      };
  }
  return state;
};
