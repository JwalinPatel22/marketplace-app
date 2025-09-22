import { useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";

export default function AuthScreen() {
    const [isSignedUp, setIsSignedUp] = useState<boolean>(false);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View>
        <Text>Create Account</Text>
        <TextInput
          label="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="example@email.com"
          mode="outlined"
        />
        <TextInput
          label="Password"
          autoCapitalize="none"
          keyboardType="email-address"
          mode="outlined"
        />
        <Button mode="contained">Signup</Button>
        <Button>Already have an account? Sign In</Button>
      </View>
    </KeyboardAvoidingView>
  );
}
