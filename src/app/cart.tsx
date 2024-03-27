import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import { View, Text, Platform } from "react-native";
import { useCart } from "./providers/CartProvider";

export default function CartScreen() {
  const { items } = useCart();
  return (
    <View>
      <Text>cart items length: {items.length}</Text>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}
