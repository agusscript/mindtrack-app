import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useAuthProvider } from "@/hooks/useAuthProvider";
import { Colors } from "@/constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function DashboardScreen() {
  const { handleSignOut, isLoading } = useAuthProvider();
  const router = useRouter();

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Cargando...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const menuItems = [
    {
      id: "todo-list",
      title: "Lista de Tareas",
      description: "Organiza tus tareas diarias",
      icon: "📝",
      onPress: () => router.push("/tasks"),
      isAvailable: true,
    },
    {
      id: "habits",
      title: "Hábitos",
      description: "Seguimiento de hábitos diarios",
      icon: "🎯",
      onPress: () => {},
      isAvailable: false,
    },
    {
      id: "mood-tracker",
      title: "Registro de Estado de Ánimo",
      description: "Monitorea tu bienestar emocional",
      icon: "😊",
      onPress: () => {},
      isAvailable: false,
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
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.welcomeText}>¡Hola!</Text>
          <Text style={styles.subtitleText}>¿Qué quieres hacer hoy?</Text>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.menuItem,
                !item.isAvailable && styles.menuItemDisabled,
              ]}
              onPress={item.onPress}
              activeOpacity={0.7}
              disabled={!item.isAvailable}
            >
              <View style={styles.menuItemContent}>
                <Text style={styles.menuIcon}>{item.icon}</Text>
                <View style={styles.menuTextContainer}>
                  <Text
                    style={[
                      styles.menuTitle,
                      !item.isAvailable && styles.menuTitleDisabled,
                    ]}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={[
                      styles.menuDescription,
                      !item.isAvailable && styles.menuDescriptionDisabled,
                    ]}
                  >
                    {item.description}
                  </Text>
                </View>
                {!item.isAvailable && (
                  <Text style={styles.comingSoonBadge}>Próximamente</Text>
                )}
              </View>
            </TouchableOpacity>
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
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 30,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.light.text,
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 16,
    color: Colors.light.text,
    opacity: 0.7,
  },
  menuContainer: {
    paddingHorizontal: 24,
    marginBottom: 30,
  },
  menuItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItemDisabled: {
    opacity: 0.6,
  },
  menuItemContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  menuIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: 4,
  },
  menuTitleDisabled: {
    color: "#999",
  },
  menuDescription: {
    fontSize: 14,
    color: Colors.light.text,
    opacity: 0.7,
  },
  menuDescriptionDisabled: {
    color: "#999",
    opacity: 0.5,
  },
  comingSoonBadge: {
    backgroundColor: "#FFA500",
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: "hidden",
  },
  logoutContainer: {
    paddingHorizontal: 24,
    paddingBottom: 30,
  },
  logoutButton: {
    backgroundColor: "#FF6B6B",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoutButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    color: Colors.light.text,
    opacity: 0.7,
  },
});
