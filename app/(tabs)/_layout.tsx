import { Tabs } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "coral",
        tabBarActiveBackgroundColor: "grey",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => {
            return focused ? (
              <FontAwesome5 name="home" size={24} color={color} />
            ) : (
              <AntDesign name="home" size={24} color="black" />
            );
          },
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

      {/* <Tabs.Screen
        name="complaint"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="screwdriver-wrench" size={24} color="black" />
          ),
        }}
      /> */}
    </Tabs>
  );
}
