import React from "react";
import { FlatList, Platform, Button } from "react-native";
import ProductItem from "../../components/shop/ProductItem";
// How do we select the data to be used in the flatlist? with the useSelector
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/color";
import * as productsActions from "../../store/actions/products";

const UserProductsScreen = ({ navigation }) => {
  // Reducer (store, actions)
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();

  // Edit User Products
  const editProductHandler = (id) => {
    navigation.navigate("EditProduct", { productId: id });
  };

  // FlatList
  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            editProductHandler(itemData.item.id);
          }}
        >
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => {
              editProductHandler(itemData.item.id);
            }}
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={() =>
              dispatch(productsActions.deleteProduct(itemData.item.id))
            }
          />
        </ProductItem>
      )}
    />
  );
};

export default UserProductsScreen;
