import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import OrdersScreen from "./index";

const Tab = createMaterialTopTabNavigator();

export default function OrdersLayout() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Active"
        component={OrdersScreen}
        initialParams={{ status: "active" }}
      />
      <Tab.Screen
        name="Delivered"
        component={OrdersScreen}
        initialParams={{ status: "delivered" }}
      />
    </Tab.Navigator>
  );
}
