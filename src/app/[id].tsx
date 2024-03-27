import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text style={{ fontSize: 20 }}>ProductDetails for id: {id}</Text>
    </View>
  );
}
