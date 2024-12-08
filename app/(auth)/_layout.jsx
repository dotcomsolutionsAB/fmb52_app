import { Stack } from "expo-router";

export default function AuthRouter() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="login-otp" />
      <Stack.Screen name="login-password" />
      <Stack.Screen name="register" />
    </Stack>
  );
}
