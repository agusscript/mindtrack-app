import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LightSensor } from "expo-sensors";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/theme";
import { getLightFeedback } from "@/src/utils/getLightFeedback";

interface ILightData {
  illuminance: number;
}

export default function LightSensorScreen() {
  const [lightLevel, setLightLevel] = useState<number | null>(null);
  const [isAvailable, setIsAvailable] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let subscription: { remove: () => void } | null = null;

    const checkAndStartSensor = async () => {
      const available = await LightSensor.isAvailableAsync();
      setIsAvailable(available);

      if (available) {
        subscription = LightSensor.addListener((data: ILightData) => {
          setLightLevel(data.illuminance);
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    };

    checkAndStartSensor();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  const feedback = getLightFeedback({ lux: lightLevel, isAvailable });

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.light.tint} />
          <Text style={styles.loadingText}>Verificando sensor de luz...</Text>
        </View>
      );
    }

    if (!isAvailable) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorIcon}>❌</Text>
          <Text style={styles.errorText}>
            Lo sentimos, el sensor de luz no está disponible en este
            dispositivo.
          </Text>
          <Text style={styles.infoText}>
            Esta funcionalidad requiere hardware específico.
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.cardContainer}>
        <View
          style={[styles.lightCard, { borderColor: feedback.color + "50" }]}
        >
          <View
            style={[
              styles.iconCircle,
              { backgroundColor: feedback.color + "20" },
            ]}
          >
            <Ionicons
              name={feedback.icon as any}
              size={40}
              color={feedback.color}
            />
          </View>

          <Text style={styles.luxLabel}>Intensidad de Luz (Lux)</Text>
          <Text style={[styles.luxValue, { color: feedback.color }]}>
            {lightLevel !== null
              ? Math.round(lightLevel).toLocaleString()
              : "--"}
          </Text>

          <View style={styles.separator} />

          <Text style={styles.feedbackTitle}>Observaciones</Text>
          <View style={styles.feedbackTextContainer}>
            <ScrollView
              style={styles.feedbackScrollView}
              contentContainerStyle={styles.feedbackScrollContent}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}
            >
              <Text style={styles.feedbackText}>{feedback.message}</Text>
            </ScrollView>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Ritmo y Luz Ambiental</Text>
          <Text style={styles.subtitle}>
            Monitorea el nivel de luz para optimizar tu descanso y bienestar.
          </Text>
        </View>

        {renderContent()}

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            💡 El valor en Lux (lx) muestra cuánta luz hay a tu alrededor. Probá
            mover el teléfono cerca de una ventana, una lámpara o a una zona
            oscura para ver cómo cambia.
          </Text>
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
    paddingBottom: 30,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.light.text,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.text,
    opacity: 0.7,
    textAlign: "center",
    paddingHorizontal: 10,
  },
  cardContainer: {
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  lightCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 32,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 2,
    height: 460,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  luxLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.light.text,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    textAlign: "center",
    opacity: 0.6,
    marginTop: 10,
  },
  luxValue: {
    fontSize: 72,
    fontWeight: "900",
    textAlign: "center",
    marginVertical: 10,
  },
  separator: {
    height: 1,
    backgroundColor: "#eee",
    marginBottom: 14,
  },
  feedbackTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.light.text,
    textAlign: "center",
    marginBottom: 8,
  },
  feedbackTextContainer: {
    flex: 1,
    maxHeight: 100,
    minHeight: 60,
  },
  feedbackScrollView: {
    flex: 1,
  },
  feedbackScrollContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  feedbackText: {
    fontSize: 16,
    color: Colors.light.text,
    lineHeight: 24,
    textAlign: "center",
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: Colors.light.text,
    opacity: 0.7,
  },
  errorContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: "#FFF0F0",
    borderRadius: 16,
    marginHorizontal: 24,
    borderWidth: 1,
    borderColor: "#FF6B6B",
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 16,
    color: Colors.light.text,
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "600",
  },
  infoContainer: {
    paddingHorizontal: 24,
    paddingTop: 20,
    marginTop: 20,
  },
  infoText: {
    fontSize: 14,
    color: Colors.light.text,
    opacity: 0.6,
    lineHeight: 20,
  },
});
