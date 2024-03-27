// ProductListItem.js

import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import Colors from "@/constants/Colors";
import { Product } from "@/types";

export const defaultPizzaImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

type ProductListItemProps = {
  product: Product;
};

export default function ProductListItem({ product }: ProductListItemProps) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: product.image || defaultPizzaImage }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure each item takes up equal space in the column
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    marginBottom: 10, // Add margin bottom for spacing between items
    alignItems: "center", // Center items horizontally
    maxWidth: "50%",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 10, // Adjust border radius if necessary
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 5, // Adjust vertical margin if necessary
  },
  price: {
    color: Colors.light.tint,
    fontWeight: "bold",
  },
});
