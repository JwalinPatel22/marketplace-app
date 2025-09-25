import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { Text, TextInput, Button, useTheme } from "react-native-paper";

export default function AuthScreen() {
  const themes = useTheme();

  const [isSignedUp, setIsSignedUp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>("");

  const handleAuth = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 8) {
      setError("Passwords must be atleast 6 characters long");
    }

    setError(null);

    
  };

  const handleSwitchMode = () => {
    setIsSignedUp((prev) => !prev);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title} variant="headlineMedium">
          {isSignedUp ? "Create Account" : "Welcome Back"}
        </Text>

        <TextInput
          label="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="example@email.com"
          mode="outlined"
          style={styles.input}
          onChangeText={setEmail}
        />

        <TextInput
          label="Password"
          autoCapitalize="none"
          keyboardType="email-address"
          mode="outlined"
          style={styles.input}
          onChangeText={setPassword}
        />

        {error && <Text style={{ color: themes.colors.error }}>{error}</Text>}

        <Button mode="contained" style={styles.button} onPress={handleAuth}>
          {isSignedUp ? "Sign Up" : "Sign In"}
        </Button>

        <Button
          mode="text"
          onPress={handleSwitchMode}
          style={styles.switchModeButton}
        >
          {isSignedUp
            ? "Already have an account? Sign In"
            : "Don't have an account ? Sign Up"}
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  switchModeButton: {
    marginTop: 16,
  },
});
