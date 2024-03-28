import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import { View, Text, Platform, FlatList } from "react-native";
import { useCart } from "./providers/CartProvider";
import CartListItem from "@/components/CartListItem";

export default function CartScreen() {
  const { items } = useCart();
  return (
    <View>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 10, gap: 10 }}
      />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}
