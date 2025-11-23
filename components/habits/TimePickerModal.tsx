import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { Colors } from "@/constants/theme";
import TimePicker from "./TimePicker";

interface TimePickerModalProps {
  visible: boolean;
  onClose: () => void;
  initialTime: string | null;
  onSave: (time?: string) => void;
  loading: boolean;
  onDisableNotification: () => void;
}

const ModalContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #ffffff;
  padding: 16px;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  shadow-color: #000;
  shadow-offset: 0px -2px;
  shadow-opacity: 0.25;
  shadow-radius: 8px;
  elevation: 5;
  z-index: 50;
`;

const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const CloseButton = styled.TouchableOpacity`
  padding: 4px;
`;

const CloseButtonText = styled.Text`
  font-size: 20px;
  color: ${Colors.light.text};
`;

const DisableButton = styled.TouchableOpacity`
  padding: 4px;
`;

const DisableButtonText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${Colors.light.buttonEnabled};
`;

const Title = styled.Text`
  font-size: 28px;
  color: ${Colors.light.text};
  text-align: center;
  margin-bottom: 10px;
  font-weight: 600;
`;

const Description = styled.Text`
  font-size: 15px;
  color: ${Colors.light.text};
  text-align: center;
  margin-horizontal: 24px;
  opacity: 0.7;
`;

const TimePickerContainer = styled.View`
  margin-top: 32px;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const SaveButton = styled.TouchableOpacity`
  align-self: center;
  background-color: ${Colors.light.buttonEnabled};
  padding-vertical: 12px;
  padding-horizontal: 24px;
  border-radius: 8px;
  margin-top: 32px;
  margin-bottom: 24px;
  min-width: 120px;
  align-items: center;
  justify-content: center;
`;

const SaveButtonText = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
`;

const TimePickerModal = ({
  visible,
  onClose,
  initialTime,
  onSave,
  loading,
  onDisableNotification,
}: TimePickerModalProps) => {
  const [selectedTime, setSelectedTime] = useState(initialTime || null);

  useEffect(() => {
    setSelectedTime(initialTime);
  }, [initialTime]);

  if (!visible) return null;

  return (
    <ModalContainer>
      <HeaderContainer>
        <CloseButton onPress={onClose}>
          <CloseButtonText>✕</CloseButtonText>
        </CloseButton>
        {initialTime && (
          <DisableButton onPress={onDisableNotification}>
            <DisableButtonText>Desactivar recordatorio</DisableButtonText>
          </DisableButton>
        )}
      </HeaderContainer>

      <Title>Configurar recordatorio</Title>

      <Description>
        Te enviaremos una notificación a esta hora cada día.
      </Description>

      <TimePickerContainer>
        <TimePicker value={selectedTime || ""} onChange={setSelectedTime} />
      </TimePickerContainer>

      <SaveButton
        onPress={() => onSave(selectedTime || undefined)}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator animating={true} color="#ffffff" />
        ) : (
          <SaveButtonText>Guardar</SaveButtonText>
        )}
      </SaveButton>
    </ModalContainer>
  );
};

export default TimePickerModal;
