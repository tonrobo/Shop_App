import React, {
  useState,
  useLayoutEffect,
  useCallback,
  useEffect,
} from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  Platform,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as productsActions from "../../store/actions/products";

import {
  MaterialHeaderButton,
  IosHeaderButton,
} from "../../components/UI/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

const EditProductScreen = ({ navigation, route }) => {
  // Create your submit button
  const myHeaderButton =
    Platform.OS === "android" ? MaterialHeaderButton : IosHeaderButton;

  let prodId = "";

  if (route.params) {
    prodId = route.params.productId;
  }

  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === prodId)
  );

  // Edit a product that exists
  const [title, setTitle] = useState(editedProduct ? editedProduct.title : "");
  const [imageUrl, setimageUrl] = useState(
    editedProduct ? editedProduct.imageUrl : ""
  );
  const [price, setPrice] = useState(editedProduct ? editedProduct.price : "");
  const [description, setDescription] = useState(
    editedProduct ? editedProduct.description : ""
  );

  // This allows us to use Redux to dispatch a function later.
  const dispatch = useDispatch();

  // Submit
  const submitHandler = useCallback(() => {
    // if we are editing
    if (editedProduct) {
      dispatch(
        productsActions.updateProduct(prodId, title, description, imageUrl)
      );
    } else {
      dispatch(
        productsActions.createProduct(title, description, imageUrl, +price)
      );
    }
  }, [dispatch, prodId, title, description, imageUrl]);

  // ****************** this is where I left off Wed night. Max is using UseEffect, but I think I need
  // to use the same useLayoutEffect with dependencies as I did in the FiltersScreen

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <HeaderButtons HeaderButtonComponent={myHeaderButton}>
            <Item
              title="Save"
              iconName={Platform.OS === "android" ? "check" : "ios-checkmark"} //left off Friday PM problem with icon.
              onPress={submitHandler}
            />
          </HeaderButtons>
        );
      },
    });
  }, [navigation, submitHandler]);

  return (
    <ScrollView style={styles.form}>
      <View style={styles.formControl}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
      </View>
      <View style={styles.formControl}>
        <Text style={styles.label}>Image URL</Text>
        <TextInput
          style={styles.input}
          value={imageUrl}
          onChangeText={(text) => setimageUrl(text)}
        />
      </View>

      {editedProduct ? null : (
        <View style={styles.formControl}>
          <Text style={styles.label}>Price</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={(text) => setPrice(text)}
          />
        </View>
      )}
      <View style={styles.formControl}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    backgroundColor: "pink",
  },
});

export default EditProductScreen;
