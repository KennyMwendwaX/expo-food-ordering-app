import { Stack, useLocalSearchParams } from "expo-router";
import { View, Text, Image, StyleSheet } from "react-native";
import products from "../../../../assets/data/products";
import { defaultPizzaImage } from "@/components/ProductListItem";
import { useState } from "react";

const sizes = ["S", "M", "L", "XL"];

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [selectedSize, setSelectedSize] = useState("M");

  const product = products.find((product) => product.id.toString() === id);

  if (!product) {
    return <Text>Product not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <Image
        source={{ uri: product.image || defaultPizzaImage }}
        style={styles.image}
      />
      <Text style={styles.sizeText}>Select size</Text>
      <View style={styles.sizes}>
        {sizes.map((size) => (
          <View
            style={[
              styles.size,
              {
                backgroundColor: selectedSize === size ? "gainsboro" : "white",
              },
            ]}
            key={size}>
            <Text>{size}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
  },
  sizeText: {
    fontSize: 20,
    fontWeight: "500",
  },
  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  size: {
    backgroundColor: "gainsboro",
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
});
