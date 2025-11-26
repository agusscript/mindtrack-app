import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { horoscopeService } from "@/src/services/horoscope.service";
import { IHoroscope } from "@/src/interfaces/IHoroscope";
import { LinearGradient } from "expo-linear-gradient";

const SIGNS = [
  { value: "aries", label: "Aries", icon: "♈", element: "fire" },
  { value: "tauro", label: "Tauro", icon: "♉", element: "earth" },
  { value: "géminis", label: "Géminis", icon: "♊", element: "air" },
  { value: "cáncer", label: "Cáncer", icon: "♋", element: "water" },
  { value: "leo", label: "Leo", icon: "♌", element: "fire" },
  { value: "virgo", label: "Virgo", icon: "♍", element: "earth" },
  { value: "libra", label: "Libra", icon: "♎", element: "air" },
  { value: "escorpio", label: "Escorpio", icon: "♏", element: "water" },
  { value: "sagitario", label: "Sagitario", icon: "♐", element: "fire" },
  { value: "capricornio", label: "Capricornio", icon: "♑", element: "earth" },
  { value: "acuario", label: "Acuario", icon: "♒", element: "air" },
  { value: "piscis", label: "Piscis", icon: "♓", element: "water" },
];

const ELEMENT_COLORS: Record<string, readonly [string, string]> = {
  fire: ["#FF6B6B", "#EE5A24"] as const,
  earth: ["#6ab04c", "#27ae60"] as const,
  air: ["#74b9ff", "#0984e3"] as const,
  water: ["#a29bfe", "#6c5ce7"] as const,
};

const ELEMENT_ICONS: Record<string, string> = {
  fire: "flame",
  earth: "leaf",
  air: "cloudy",
  water: "water",
};

export default function HoroscopeScreen() {
  const [selectedSign, setSelectedSign] = useState<string | null>(null);
  const [horoscope, setHoroscope] = useState<IHoroscope | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHoroscope = async (sign: string) => {
    try {
      setLoading(true);
      setError(null);
      setHoroscope(null);

      const data = await horoscopeService.getDailyHoroscope(sign);
      setHoroscope(data);
    } catch (err) {
      console.error("Error fetching horoscope: ", err);
      setError(
        "No pudimos obtener tu horóscopo en este momento. Intenta más tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  const getSelectedSignData = () => {
    return SIGNS.find((s) => s.value === selectedSign);
  };

  const signData = getSelectedSignData();

  return (
    <LinearGradient
      colors={["#1a1a2e", "#16213e", "#0f0f23"]}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.headerIcon}>✨</Text>
            <Text style={styles.title}>Tu Horóscopo Diario</Text>
            <Text style={styles.subtitle}>
              Elegí tu signo y descubrí el mensaje del universo para vos.
            </Text>
          </View>

          <View style={styles.signGrid}>
            {SIGNS.map((sign) => {
              const isSelected = selectedSign === sign.value;
              const colors = ELEMENT_COLORS[sign.element];

              return (
                <Pressable
                  key={sign.value}
                  onPress={() => {
                    setSelectedSign(sign.value);
                    fetchHoroscope(sign.value);
                  }}
                  style={({ pressed }) => [
                    styles.signButton,
                    isSelected && styles.signButtonSelected,
                    pressed && styles.signButtonPressed,
                  ]}
                >
                  {isSelected ? (
                    <LinearGradient
                      colors={colors}
                      style={styles.signButtonGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                      <Text style={styles.signIcon}>{sign.icon}</Text>
                      <Text style={styles.signLabelSelected}>{sign.label}</Text>
                    </LinearGradient>
                  ) : (
                    <View style={styles.signButtonInner}>
                      <Text style={styles.signIcon}>{sign.icon}</Text>
                      <Text style={styles.signLabel}>{sign.label}</Text>
                    </View>
                  )}
                </Pressable>
              );
            })}
          </View>

          {error && (
            <View style={styles.errorBox}>
              <Ionicons name="alert-circle" size={24} color="#FF6B6B" />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          {loading && (
            <View style={styles.loadingContainer}>
              <View style={styles.loadingOrb}>
                <ActivityIndicator size="large" color="#a29bfe" />
              </View>
              <Text style={styles.loadingText}>Consultando los astros...</Text>
              <Text style={styles.loadingSubtext}>🌙 ✨ 🌟</Text>
            </View>
          )}

          {!loading && !error && horoscope && signData && (
            <View style={styles.cardContainer}>
              <LinearGradient
                colors={ELEMENT_COLORS[signData.element]}
                style={styles.cardGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.cardHeader}>
                  <Text style={styles.cardSignIcon}>{signData.icon}</Text>
                  <View style={styles.cardTitleContainer}>
                    <Text style={styles.cardTitle}>
                      {horoscope.signDisplay}
                    </Text>
                    <View style={styles.elementBadge}>
                      <Ionicons
                        name={ELEMENT_ICONS[signData.element] as any}
                        size={14}
                        color="#fff"
                      />
                      <Text style={styles.elementText}>
                        {signData.element === "fire" && "Fuego"}
                        {signData.element === "earth" && "Tierra"}
                        {signData.element === "air" && "Aire"}
                        {signData.element === "water" && "Agua"}
                      </Text>
                    </View>
                  </View>
                </View>
              </LinearGradient>

              <View style={styles.cardBody}>
                <View style={styles.dateContainer}>
                  <Ionicons name="calendar-outline" size={16} color="#a29bfe" />
                  <Text style={styles.dateText}>{horoscope.date}</Text>
                </View>

                <View style={styles.divider}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerStar}>⭐</Text>
                  <View style={styles.dividerLine} />
                </View>

                <Text style={styles.horoscopeText}>{horoscope.horoscope}</Text>

                <View style={styles.cardFooter}>
                  <Text style={styles.footerText}>
                    🌌 El universo te acompaña
                  </Text>
                </View>
              </View>
            </View>
          )}

          {!selectedSign && !loading && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>🔮</Text>
              <Text style={styles.emptyText}>
                Seleccioná tu signo zodiacal para revelar tu destino
              </Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
    alignItems: "center",
  },
  headerIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 8,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 15,
    color: "rgba(255,255,255,0.7)",
    textAlign: "center",
    paddingHorizontal: 20,
    lineHeight: 22,
  },
  signGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    gap: 10,
    justifyContent: "center",
    marginBottom: 24,
  },
  signButton: {
    width: "22%",
    aspectRatio: 0.9,
    borderRadius: 16,
    overflow: "hidden",
  },
  signButtonSelected: {
    transform: [{ scale: 1.05 }],
  },
  signButtonPressed: {
    opacity: 0.8,
  },
  signButtonInner: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  signButtonGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
  },
  signIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  signLabel: {
    fontSize: 11,
    color: "rgba(255,255,255,0.7)",
    fontWeight: "500",
  },
  signLabelSelected: {
    fontSize: 11,
    color: "#fff",
    fontWeight: "700",
  },
  errorBox: {
    backgroundColor: "rgba(255,107,107,0.15)",
    padding: 16,
    borderRadius: 16,
    marginHorizontal: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255,107,107,0.3)",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  errorText: {
    color: "#FF6B6B",
    fontSize: 14,
    fontWeight: "600",
    flex: 1,
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50,
  },
  loadingOrb: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(162,155,254,0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  loadingText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  loadingSubtext: {
    fontSize: 20,
    marginTop: 8,
    letterSpacing: 8,
  },
  cardContainer: {
    marginHorizontal: 20,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  cardGradient: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  cardSignIcon: {
    fontSize: 48,
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  cardTitleContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 4,
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  elementBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  elementText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
  },
  cardBody: {
    padding: 20,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 16,
  },
  dateText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.7)",
    fontWeight: "500",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  dividerStar: {
    marginHorizontal: 12,
    fontSize: 16,
  },
  horoscopeText: {
    fontSize: 16,
    color: "rgba(255,255,255,0.9)",
    lineHeight: 28,
    textAlign: "center",
    fontStyle: "italic",
  },
  cardFooter: {
    marginTop: 24,
    alignItems: "center",
  },
  footerText: {
    fontSize: 13,
    color: "rgba(255,255,255,0.5)",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 50,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: "rgba(255,255,255,0.6)",
    textAlign: "center",
    lineHeight: 24,
  },
});
