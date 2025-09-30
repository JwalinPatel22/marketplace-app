import { useAuth } from "@/lib/auth-context";
import { Link } from "expo-router";
import { View, StyleSheet } from "react-native";
import { Text, Button } from "react-native-paper";

export default function Index() {
  const { signOut } = useAuth();
  return (
    <View style={styles.view}>
      <Text>Welcome to catabytes application</Text>
      <Button mode="text" onPress={signOut} icon={"logout"}>
        SignOut
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  navButton: {
    width: 100,
    height: 20,
    borderRadius: 8,
    backgroundColor: "coral",
    textAlign: "center",
  },
});
