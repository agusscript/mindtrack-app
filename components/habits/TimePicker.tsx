import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useCallback, useState } from "react";
import { Platform, View } from "react-native";
import styled from "styled-components/native";
import { Colors } from "@/constants/theme";

interface TimePickerProps {
  value: string;
  onChange: (time: string) => void;
  error?: string;
  touched?: boolean;
}

const SelectButton = styled.TouchableOpacity<{ hasError: boolean }>`
  border-width: 1px;
  border-radius: 8px;
  padding: 8px;
  border-color: ${(props) => (props.hasError ? "#EF4444" : "#D1D5DB")};
`;

const SelectButtonText = styled.Text`
  color: ${Colors.light.text};
  font-size: 16px;
`;

const TimePicker = ({ value, onChange, error, touched }: TimePickerProps) => {
  const dateToTime = useCallback((date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  }, []);

  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowPicker(false);
      if (selectedDate && event.type !== "dismissed") {
        onChange(dateToTime(selectedDate));
      }
    }
  };

  return (
    <View>
      <SelectButton
        onPress={() => setShowPicker(true)}
        hasError={!!(error && touched)}
      >
        <SelectButtonText>{value || "Seleccionar hora"}</SelectButtonText>
      </SelectButton>

      {Platform.OS === "android" && showPicker && (
        <DateTimePicker
          testID="time-picker"
          value={value ? new Date(`1970-01-01T${value}:00`) : new Date()}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

export default TimePicker;
