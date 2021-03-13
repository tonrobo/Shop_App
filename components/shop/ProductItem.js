import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";

import Card from "../UI/Card.js";
// import DefaultText from "./DefaultText";

// Purpose: Presentation
// This components will be presentational, and only be used to present the product. It will be used by
// different components. I think we need a param for the item

const ProductItem = (props) => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <Card style={styles.product}>
      <View style={styles.touchable}>
        {/* Since we want these buttons to be used in the Products for Sale and Admin Products onSelect */}
        <TouchableCmp onPress={props.onSelect} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{
                  uri: props.image,
                }}
              />
            </View>
            <View style={styles.details}>
              <Text style={styles.title}>{props.title}</Text>
              <Text style={styles.price}>${props.price.toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>
              {/* We had buttons here when it was just for the Products (in the store), but now with the Admin Products
                we need to create buttons for several use cases. So we'll use props.children instead */}
              {props.children}
              {/* Now we can reorganize the Product Item component for the For Sale Products and the Admin's Products */}
            </View>
          </View>
        </TouchableCmp>
      </View>
    </Card>
  );
};
const styles = StyleSheet.create({
  product: {
    height: 300, //Remember you can use the Dimesions API and make it responsive.
    margin: 20,
  },
  touchable: {
    overflow: "hidden",
    borderRadius: 10,
  },
  imageContainer: {
    width: "100%",
    height: "60%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  details: {
    alignItems: "center",
    height: "20%",
    padding: 10,
  },
  title: {
    fontSize: 18,
    marginVertical: 2,
    fontFamily: "open-sans-bold",
  },
  price: {
    fontSize: 14,
    color: "#888",
    fontFamily: "open-sans",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "20%",
    paddingHorizontal: 20,
  },
});

export default ProductItem;
