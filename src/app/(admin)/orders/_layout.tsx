import { Stack } from "expo-router";

export default function OrdersLayout() {
  return (
    <Stack>
      <Stack.Screen options={{ title: "Orders" }} />
    </Stack>
  );
}
