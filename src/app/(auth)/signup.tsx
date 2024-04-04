import { Link, Stack } from "expo-router";
import { View, Text } from "react-native";

export default function SignupScreen() {
  return (
    <View>
      <Stack.Screen
        options={{
          title: "Sign Up",
        }}
      />
      <Text>SignupScreen</Text>
      <Link href={"/(auth)/signin"}>Signin</Link>
    </View>
  );
}
