import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useAuthProvider } from "@/src/hooks/useAuthProvider";
import { Colors } from "@/constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import MenuCard from "@/components/MenuCard";

export default function DashboardScreen() {
  const { handleSignOut, user } = useAuthProvider();
  const router = useRouter();

  const menuItems = [
    {
      id: "todo-list",
      title: "Lista de Tareas",
      description: "Gestiona y organiza tus tareas diarias",
      icon: "📝",
      onPress: () => router.push("/(tabs)/tasks"),
      isAvailable: true,
    },
    {
      id: "quotes",
      title: "Frase Motivacional",
      description: "Inspírate con la frase del día",
      icon: "💭",
      onPress: () => router.push("/(tabs)/quotes"),
      isAvailable: true,
    },
    {
      id: "habits",
      title: "Hábitos",
      description: "Seguimiento de hábitos diarios",
      icon: "🎯",
      onPress: () => router.push("/(tabs)/habits"),
      isAvailable: true,
    },
    {
      id: "light-sensor",
      title: "Sensor de Luz",
      description: "Monitorea la intensidad de la luz",
      icon: "💡",
      onPress: () => router.push("/(tabs)/light-sensor"),
      isAvailable: true,
    },
    {
      id: "mood-tracker",
      title: "Estado de Ánimo",
      description: "Registra tu bienestar emocional",
      icon: "😊",
      onPress: () => {},
      isAvailable: false,
    },
    {
      id: "weather-insight",
      title: "Clima y Bienestar",
      description: "Monitorea el clima actual y recibí sugerencias para tu bienestar",
      icon: "🌤",
      onPress: () => router.push("/(tabs)/weather-insight"),
      isAvailable: true,
    },
    {
      id: "meditation",
      title: "Meditación",
      description: "Ejercicios de mindfulness",
      icon: "🧘",
      onPress: () => {},
      isAvailable: false,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>¡Hola, {user?.name}!</Text>
          <Text style={styles.subtitleText}>¿Qué quieres hacer hoy?</Text>
        </View>

        <View style={styles.grid}>
          {menuItems.map((item) => (
            <MenuCard
              key={item.id}
              icon={item.icon}
              title={item.title}
              description={item.description}
              isAvailable={item.isAvailable}
              onPress={item.onPress}
            />
          ))}
        </View>

        <View style={styles.logoutContainer}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleSignOut}
            activeOpacity={0.8}
          >
            <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 10,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: "700",
    color: Colors.light.text,
    marginBottom: 6,
  },
  subtitleText: {
    fontSize: 17,
    color: Colors.light.text,
    opacity: 0.7,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  logoutContainer: {
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  logoutButton: {
    backgroundColor: "#FF6B6B",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    elevation: 3,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
