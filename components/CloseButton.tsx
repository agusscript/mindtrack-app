import { TouchableOpacity, Text } from "react-native";

interface ICloseButtonProps {
  onPress: () => void;
  iconSize?: number;
  isNightMode?: boolean;
}

export default function CloseButton({
  onPress,
  iconSize = 18,
  isNightMode = false,
}: ICloseButtonProps) {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      accessibilityLabel="close-button"
      style={{
        width: iconSize + 8,
        height: iconSize + 8,
        borderRadius: (iconSize + 8) / 2,
        backgroundColor: isNightMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text 
        style={{
          fontSize: iconSize,
          color: isNightMode ? '#FFFFFF' : '#000000',
          fontWeight: 'bold',
        }}
      >
        ×
      </Text>
    </TouchableOpacity>
  );
}
