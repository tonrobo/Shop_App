import React, { useState, useLayoutEffect, useCallback } from "react";
import { View, Text, TextInput, StyleSheet, Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
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
  const [price, setPrice] = useState(
    editedProduct ? editedProduct.price.toFixed(2) : ""
  );
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
    navigation.goBack();
  }, [dispatch, prodId, title, description, imageUrl, price]);

  // Lastly we need to automatically slide back to the Product after a new product has been added and/or
  // add an alert for user reassurance and confirmation. Use the Alert API for deleting, confriming changes, and
  // new product has been added.

  //  Max is using UseEffect, but I think I need
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
    <KeyboardAwareScrollView style={styles.form}>
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
            keyboardType="decimal-pad"
            style={styles.input}
            value={price}
            onChangeText={(text) => setPrice(text)}
          />
        </View>
      )}
      <View style={styles.formControl}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.inputMulti}
          value={description}
          multiline
          numberOfLines={4}
          onChangeText={(text) => setDescription(text)}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  // KeyboardAvareScrollView
  form: {
    flex: 1,
    padding: 10,
  },
  // Title & Input Container
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
    backgroundColor: "#fff",
  },
  inputMulti: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    backgroundColor: "#fff",
    height: 150,
  },
});

export default EditProductScreen;
