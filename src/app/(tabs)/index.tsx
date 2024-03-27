import { View, FlatList } from "react-native";
import products from "../../../assets/data/products";
import ProductListItem from "@/components/ProductListItem";

export default function TabOneScreen() {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={products}
        numColumns={2} // Set the number of columns to 2
        renderItem={({ item }) => <ProductListItem product={item} />} // Pass each individual product item as a prop
        keyExtractor={(item) => item.id.toString()} // Provide a unique key extractor function
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{ gap: 10 }}
      />
    </View>
  );
}
