import Colors from "@/constants/Colors";
import { Link, Stack } from "expo-router";
import { Pressable } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function MenuStack() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Orders",
        }}
      />
    </Stack>
  );
}
