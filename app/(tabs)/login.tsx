import { View, Text, StyleSheet } from "react-native";

export default function loginScreen() {
  return (
    <View style={styles.view}>
      <Text>Login Page Meow...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
