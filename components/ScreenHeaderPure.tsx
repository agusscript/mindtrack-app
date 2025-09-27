import { Colors } from "@/constants/theme";
import { Text, View } from "react-native";

interface IScreenHeaderPure {
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  header?: string;
  headerColor?: string;
}

export default function ScreenHeaderPure({
  leftComponent,
  rightComponent,
  header = "",
  headerColor = Colors.light.text,
}: IScreenHeaderPure) {
  return (
    <View className="flex flex-row items-center justify-between my-2">
      <View className="min-h-[48px] min-w-[48px] items-center justify-center overflow-hidden">
        {leftComponent}
      </View>
      {header && (
        <Text
          className="text-[28px] font-made-mirage leading-none text-center font-medium tracking-[0px]"
          style={{ color: headerColor }}
        >
          {header}
        </Text>
      )}

      <View className="min-h-[48px] min-w-[48px] items-center justify-center overflow-hidden">
        {rightComponent}
      </View>
    </View>
  );
}
