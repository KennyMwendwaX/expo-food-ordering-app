import { Link, Stack } from "expo-router";
import { View, Text } from "react-native";

export default function SigninScreen() {
  return (
    <View>
      <Stack.Screen
        options={{
          title: "Sign In",
        }}
      />
      <Text>Signin</Text>
      <Link href={"/(auth)/signup"}>Signup</Link>
    </View>
  );
}
