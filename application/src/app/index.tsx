import Button from "@/components/Button";
import { useAuth } from "@/providers/AuthProvider";
import { Link, Redirect } from "expo-router";
import { View } from "react-native";

export default function index() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href={"/(auth)/signin"} />;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <Link href={"/(user)"} asChild>
        <Button text="User" />
      </Link>
      <Link href={"/(admin)"} asChild>
        <Button text="Admin" />
      </Link>
      <Link href={"/(auth)/signin"} asChild>
        <Button text="Sign in" />
      </Link>
    </View>
  );
}
