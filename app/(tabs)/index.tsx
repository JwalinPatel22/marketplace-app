import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={styles.view}>
      <Text>Welcome to catabytes application</Text>
      <Text>We win SIH'25</Text>
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
