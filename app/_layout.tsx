import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";

//checks if user is logged in or not, if not then shows auth screen
// children i.e. type: react components are passed as props
function RouteGaurd({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isAuth = false;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  });

  useEffect(() => {
    if (mounted && !isAuth) {
      // only navigate after layout has mounted
      router.replace("/auth");
    }
  }, [mounted, isAuth]);
  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <RouteGaurd>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="auth" options={{ headerShown: false }} />
      </Stack>
    </RouteGaurd>
  );
}
