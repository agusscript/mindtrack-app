import { ActivityIndicator, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { Colors } from "@/constants/theme";

interface IButtonProps {
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  text: string;
  icon?: React.JSX.Element;
  testID?: string;
}

export default function CustomButton({
  disabled,
  onPress,
  loading = false,
  text,
  icon,
  testID,
  ...props
}: IButtonProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        accessibilityLabel="submit-button"
        style={[
          styles.button,
          disabled || loading ? styles.buttonDisabled : styles.buttonEnabled,
        ]}
        testID={testID}
        activeOpacity={0.8}
        {...props}
      >
        {loading ? (
          <ActivityIndicator animating={true} color="#FFFFFF" size="small" />
        ) : (
          <View style={styles.buttonContent}>
            <Text
              style={[
                styles.buttonText,
                disabled || loading ? styles.buttonTextDisabled : styles.buttonTextEnabled,
              ]}
            >
              {text}
            </Text>
            {icon}
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonEnabled: {
    backgroundColor: Colors.light.buttonEnabled,
  },
  buttonDisabled: {
    backgroundColor: Colors.light.buttonDisabled,
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  buttonTextEnabled: {
    color: Colors.light.buttonEnabledText,
  },
  buttonTextDisabled: {
    color: Colors.light.buttonDisabledText,
  },
});
