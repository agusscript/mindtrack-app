import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { Colors } from "@/constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { quoteService } from "@/src/services/quote.service";
import { IQuote } from "@/src/interfaces/IQuote";
import ViewShot, { captureRef } from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import { Ionicons } from "@expo/vector-icons";

export default function QuotesScreen() {
  const [quote, setQuote] = useState<IQuote | null>(null);
  const [isLoadingQuote, setIsLoadingQuote] = useState(true);
  const [quoteError, setQuoteError] = useState<string | null>(null);
  const viewShotRef = useRef<ViewShot>(null);

  const fetchQuote = async () => {
    try {
      setIsLoadingQuote(true);
      setQuoteError(null);
      const todayQuote = await quoteService.getTodayQuote();
      setQuote(todayQuote);
    } catch (error) {
      setQuoteError(
        error instanceof Error ? error.message : "Error al cargar la frase"
      );
    } finally {
      setIsLoadingQuote(false);
    }
  };

  const shareQuoteImage = async () => {
    if (!viewShotRef.current) return;

    try {
      const uri = await captureRef(viewShotRef, {
        format: "png",
        quality: 1,
      });

      await Sharing.shareAsync(uri);
    } catch (error) {
      console.log("Error sharing image:", error);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Frase Motivacional</Text>
          <Text style={styles.subtitle}>Inspírate con la frase del día</Text>
        </View>

        <View style={styles.quoteContainer}>
          {isLoadingQuote ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={Colors.light.tint} />
              <Text style={styles.loadingText}>Cargando frase...</Text>
            </View>
          ) : quoteError ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorIcon}>⚠️</Text>
              <Text style={styles.errorText}>{quoteError}</Text>
              <TouchableOpacity
                style={styles.retryButton}
                onPress={fetchQuote}
                activeOpacity={0.8}
              >
                <Text style={styles.retryButtonText}>Reintentar</Text>
              </TouchableOpacity>
            </View>
          ) : quote ? (
            <>
              <ViewShot ref={viewShotRef} style={styles.quoteCard}>
                <View style={styles.quoteIconContainer}>
                  <Text style={styles.quoteIcon}>💭</Text>
                </View>
                <Text style={styles.quoteLabel}>Frase del día</Text>
                <View style={styles.quoteTextContainer}>
                  <Text style={styles.quoteText}>&ldquo;{quote.q}&rdquo;</Text>
                </View>
                <View style={styles.quoteAuthorContainer}>
                  <View style={styles.authorLine} />
                  <Text style={styles.quoteAuthor}>{quote.a}</Text>
                </View>
              </ViewShot>

              <TouchableOpacity
                style={styles.shareButton}
                onPress={shareQuoteImage}
                activeOpacity={0.8}
              >
                <Text style={styles.shareButtonText}>Compartir imagen</Text>
                <Ionicons
                  name="share-outline"
                  size={20}
                  color="#fff"
                  style={{ marginRight: 6 }}
                />
              </TouchableOpacity>
            </>
          ) : null}
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>💡 La frase se actualiza cada día</Text>
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
  },
  quoteContainer: {
    paddingHorizontal: 24,
    flex: 1,
    justifyContent: "center",
    minHeight: 300,
  },
  quoteCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 32,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  quoteIconContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  quoteIcon: {
    fontSize: 48,
  },
  quoteLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.light.tint,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    textAlign: "center",
    marginBottom: 20,
  },
  quoteTextContainer: {
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  quoteText: {
    fontSize: 20,
    fontStyle: "italic",
    color: Colors.light.text,
    lineHeight: 32,
    textAlign: "center",
    fontWeight: "400",
  },
  quoteAuthorContainer: {
    alignItems: "center",
    marginTop: 8,
  },
  authorLine: {
    width: 60,
    height: 2,
    backgroundColor: Colors.light.tint,
    marginBottom: 12,
    opacity: 0.3,
  },
  quoteAuthor: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.text,
    opacity: 0.8,
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
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 16,
    color: "#FF6B6B",
    textAlign: "center",
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    minWidth: 120,
  },
  retryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
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
    textAlign: "center",
    lineHeight: 20,
  },
  shareButton: {
    marginTop: 20,
    backgroundColor: Colors.light.tint,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  shareButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
