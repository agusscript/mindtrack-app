import { AuthProvider } from "@/src/context/AuthContext";
import { Stack } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <AuthProvider>
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
        <Stack.Screen
          name="quotes"
          options={{
            title: "Quotes",
          }}
        />
        <Stack.Screen
          name="habits"
          options={{
            title: "Habits",
          }}
        />
        <Stack.Screen
          name="light-sensor"
          options={{
            title: "Light Sensor",
          }}
        />
      </Stack>
    </AuthProvider>
  );
}
