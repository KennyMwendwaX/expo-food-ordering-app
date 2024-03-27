import { View } from "react-native";
import products from "../../../assets/data/products";
import ProductListItem from "@/components/ProductListItem";

export default function TabOneScreen() {
  return (
    <View>
      <ProductListItem products={products} />
    </View>
  );
}
