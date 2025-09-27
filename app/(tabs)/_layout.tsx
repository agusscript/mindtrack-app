import { Stack } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Stack.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
        }}
      />
      <Stack.Screen
        name="sign-up"
        options={{
          title: "Sign Up",
        }}
      />
      <Stack.Screen
        name="sign-in"
        options={{
          title: "Sign In",
        }}
      />
      <Stack.Screen
        name="tasks"
        options={{
          title: "Tasks",
        }}
      />
    </Stack>
  );
}
