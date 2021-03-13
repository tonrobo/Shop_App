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
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };
    case UPDATE_PRODUCT:
      const productIndex = state.userProducts.findIndex(
        (prod) => prod.id === action.pid
      );
      const updatedProduct = new Product(
        action.pid,
        state.userProducts[productIndex].ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        state.userProducts[productIndex].price
        // state.userProducts[productIndex].price
      );
      //this creates copy
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[productIndex] = updatedProduct;

      // now we need to update the available products
      const availableProductIndex = state.availableProducts.findIndex(
        (prod) => prod.id === action.pid
      );
      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[availableProductIndex] = updatedProduct;
      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts,
      };
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
