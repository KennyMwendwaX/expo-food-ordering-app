import { View, Text, StyleSheet } from "react-native";

export default function CreateProductScreen() {
  return (
    <View style={styles.container}>
      <Text> create</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
});
