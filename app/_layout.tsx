import { AuthProvider, useAuth } from "@/lib/auth-context";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";

//checks if user is logged in or not, if not then shows auth screen
// children i.e. type: react components are passed as props
function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, isLoadingUser } = useAuth();

  const [mounted, setMounted] = useState(false);
  const segments = useSegments();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const inAuthGroup = segments[0] === "auth"; //checks if user in auth screen 
    if (mounted && !user && !inAuthGroup && !isLoadingUser) {
      // only navigate after layout has mounted
      router.replace("/auth");
    } else if (user && inAuthGroup && !isLoadingUser) {
      router.replace("/");
    }
  }, [mounted, user, segments]);
  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RouteGuard>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="auth" options={{ headerShown: false }} />
        </Stack>
      </RouteGuard>
    </AuthProvider>
  );
}
