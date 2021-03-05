import React, { useLayoutEffect } from "react";
import { FlatList, Platform, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";
import Colors from "../../constants/color";

// Navigation.setOptions now requires the header buttons
import {
  MaterialHeaderButton,
  IosHeaderButton,
} from "../../components/UI/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

const ProductsOverviewScreen = ({ navigation }) => {
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  // Now we need to add a handler for using the appropriate button actions which is just a function stored in a
  // constant. Previously, this was the function in the onViewDetail prop on the button.
  const selectItemHandler = (id, title) => {
    navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title,
    });
  };

  const myHeaderButton =
    Platform.OS === "android" ? MaterialHeaderButton : IosHeaderButton;

  const cartIcon =
    Platform.OS === "android" ? "cart-outline" : "ios-cart-sharp";

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <HeaderButtons HeaderButtonComponent={myHeaderButton}>
            <Item
              title="Cart"
              iconName={cartIcon}
              onPress={() => {
                navigation.navigate("ShoppingCart");
              }}
            />
          </HeaderButtons>
        );
      },
    });
  }, [navigation]); //isFavorite needs to be a dependency so the favorite icon fills in
  // when selected.

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.title);
          }}
          // Now we are going to remove the onAddToCart...
          //onAddToCart={() => {
          // Remember our action creator looks like this..
          //  export const addToCart = (product) => {
          //      return { type: ADD_TO_CART, product: product };
          //  };
          //dispatch(cartActions.addToCart(itemData.item));
          // console.log("We added the item from Overview");
          //}}
          //description={itemData.item.description}
        >
          {/* Change the self-closing ProductItem shop component to include "the children" (Buttons) 
            in between the open and closing tags */}
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          />
          <Button
            color={Colors.primary}
            title="To Cart"
            onPress={() => dispatch(cartActions.addToCart(itemData.item))}
          />
        </ProductItem>
      )}
    />
  );
};

export default ProductsOverviewScreen;
