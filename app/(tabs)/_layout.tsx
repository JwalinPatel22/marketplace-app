import { Tabs } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: "#f5f5f5" },
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: "#f5f5f5",
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarActiveTintColor: "#6200ee",
        tabBarInactiveTintColor: "#666666",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="calendar-today"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="chart-line"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="login"
        options={{
          title: "Login",
          tabBarIcon: ({ color }) => (
            <Entypo name="login" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
