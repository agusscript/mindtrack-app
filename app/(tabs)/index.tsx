import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuthProvider } from "@/hooks/useAuthProvider";
import { Colors } from "@/constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";

export default function HomeScreen() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthProvider();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/(tabs)/dashboard");
    }
  }, [isAuthenticated, router]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Cargando...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.title}>MindTrack</Text>
          <Text style={styles.subtitle}>
            Rastrea tus pensamientos, gestiona tus tareas y mejora tu bienestar
            mental
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() => router.push("/(tabs)/sign-up")}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>Crear Cuenta</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => router.push("/(tabs)/sign-in")}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>Características</Text>
          <View style={styles.featureItem}>
            <Text style={styles.featureText}>📝 Gestión de Tareas</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureText}>🧠 Seguimiento Mental</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureText}>📊 Análisis de Progreso</Text>
          </View>
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
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
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
  headerContainer: {
    alignItems: "center",
    marginBottom: 48,
    paddingTop: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: Colors.light.text,
    marginBottom: 16,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.text,
    textAlign: "center",
    lineHeight: 24,
    opacity: 0.7,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    marginBottom: 48,
  },
  button: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 16,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButton: {
    backgroundColor: Colors.light.tint,
  },
  secondaryButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: Colors.light.tint,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  secondaryButtonText: {
    color: Colors.light.tint,
    fontSize: 18,
    fontWeight: "600",
  },
  featuresContainer: {
    flex: 1,
  },
  featuresTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.light.text,
    marginBottom: 20,
    textAlign: "center",
  },
  featureItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: Colors.light.tint,
  },
  featureText: {
    fontSize: 16,
    color: Colors.light.text,
    fontWeight: "500",
  },
});
