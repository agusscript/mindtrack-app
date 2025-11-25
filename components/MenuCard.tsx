import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/theme";

interface IMenuCardProps {
  icon: string;
  title: string;
  description: string;
  isAvailable: boolean;
  onPress: () => void;
}

export default function MenuCard({
  icon,
  title,
  description,
  isAvailable,
  onPress,
}: IMenuCardProps) {
  return (
    <TouchableOpacity
      style={[styles.card, !isAvailable && styles.cardDisabled]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={!isAvailable}
    >
      <View style={styles.cardInner}>
        <Text style={styles.cardIcon}>{icon}</Text>

        <Text style={[styles.cardTitle, !isAvailable && styles.cardTitleDisabled]}>
          {title}
        </Text>

        <Text
          style={[
            styles.cardDescription,
            !isAvailable && styles.cardDescriptionDisabled,
          ]}
        >
          {description}
        </Text>

        {!isAvailable && (
          <View style={styles.comingSoonChip}>
            <Text style={styles.comingSoonText}>Próximamente</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 26,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
    width: "100%",
    marginBottom: 18,
  },
  cardDisabled: {
    opacity: 0.5,
  },
  cardInner: {
    alignItems: "center",
  },
  cardIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: Colors.light.text,
    textAlign: "center",
    marginBottom: 6,
  },
  cardTitleDisabled: {
    color: "#888",
  },
  cardDescription: {
    fontSize: 13,
    textAlign: "center",
    color: "#555",
    opacity: 0.8,
    marginBottom: 10,
  },
  cardDescriptionDisabled: {
    color: "#777",
  },
  comingSoonChip: {
    backgroundColor: "#FFC46C",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 4,
  },
  comingSoonText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#fff",
  },
});
