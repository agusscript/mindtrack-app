import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/theme";
import { weatherService } from "@/src/services/weather.service";
import { IWeather } from "@/src/interfaces/IWeather";
import { getWeatherFeedback } from "@/src/utils/getWeatherFeedback";

export default function WeatherInsightScreen() {
  const [weather, setWeather] = useState<IWeather | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const data = await weatherService.getCurrentWeather();
        setWeather(data);
      } catch (err) {
        console.error(err);
        setError("Hubo un problema al obtener el clima.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const feedback = getWeatherFeedback({ weather });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <Text style={styles.title}>Clima & Bienestar</Text>
        <Text style={styles.subtitle}>
          Observá el clima actual y recibí sugerencias para tu bienestar diario.
        </Text>

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.light.tint} />
            <Text style={styles.loadingText}>Obteniendo información...</Text>
          </View>
        )}

        {!loading && error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {!loading && weather && (
          <>
            <View style={styles.weatherCard}>
              <Ionicons
                name="partly-sunny-outline"
                size={50}
                color={Colors.light.tint}
              />
              <Text style={styles.tempValue}>{weather.temperature}°C</Text>
              <Text style={styles.tempLabel}>{weather.description}</Text>
            </View>

            <View style={styles.infoGrid}>
              <View style={styles.infoCard}>
                <Ionicons name="water-outline" size={26} color="#4A90E2" />
                <Text style={styles.infoTitle}>Humedad</Text>
                <Text style={styles.infoValue}>{weather.humidity}%</Text>
              </View>

              <View style={styles.infoCard}>
                <Ionicons name="leaf-outline" size={26} color="#6ab04c" />
                <Text style={styles.infoTitle}>Viento</Text>
                <Text style={styles.infoValue}>{weather.wind} km/h</Text>
              </View>
            </View>

            <View
              style={[styles.messageBox, { borderLeftColor: feedback.color }]}
            >
              <View style={styles.messageHeader}>
                <Ionicons
                  name={feedback.icon as any}
                  size={24}
                  color={feedback.color}
                />
                <Text style={styles.messageTitle}>Consejo para hoy</Text>
              </View>
              <Text style={styles.messageText}>{feedback.message}</Text>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 20,
    color: Colors.light.text,
  },
  subtitle: {
    fontSize: 15,
    textAlign: "center",
    color: Colors.light.text,
    opacity: 0.7,
    marginBottom: 20,
    paddingHorizontal: 30,
  },
  loadingContainer: { alignItems: "center", marginTop: 40 },
  loadingText: { marginTop: 10, opacity: 0.6 },
  errorContainer: { padding: 20, marginTop: 40 },
  errorText: {
    color: "red",
    textAlign: "center",
    fontSize: 16,
  },
  weatherCard: {
    backgroundColor: "#fff",
    marginHorizontal: 24,
    padding: 32,
    borderRadius: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  tempValue: {
    fontSize: 64,
    fontWeight: "900",
    marginTop: 10,
    color: Colors.light.text,
  },
  tempLabel: {
    fontSize: 18,
    opacity: 0.7,
  },
  infoGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    marginTop: 20,
  },
  infoCard: {
    width: "48%",
    backgroundColor: "#fff",
    paddingVertical: 22,
    borderRadius: 18,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  infoTitle: {
    marginTop: 6,
    opacity: 0.7,
    fontSize: 13,
  },
  infoValue: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 4,
  },
  messageBox: {
    marginTop: 30,
    marginHorizontal: 24,
    backgroundColor: "#f0f7ff",
    padding: 24,
    borderRadius: 18,
    borderLeftWidth: 4,
  },
  messageHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 10,
  },
  messageTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.light.text,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
    opacity: 0.8,
  },
});
