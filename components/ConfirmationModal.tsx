import React from "react";
import { Modal, Pressable } from "react-native";
import styled from "styled-components/native";

interface IConfirmationModalProps {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

const Overlay = styled.Pressable`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  padding: 24px;
`;

const ModalContainer = styled.View`
  background-color: #ffffff;
  border-radius: 16px;
  width: 100%;
  max-width: 320px;
  padding-vertical: 20px;
  padding-horizontal: 18px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.25;
  shadow-radius: 8px;
  elevation: 8;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #111827;
  margin-bottom: 12px;
`;

const Message = styled.Text`
  font-size: 16px;
  color: #6b7280;
  line-height: 24px;
  margin-bottom: 24px;
`;

const ButtonsContainer = styled.View`
  flex-direction: row;
  gap: 12px;
`;

const Button = styled.Pressable<{ variant: "primary" | "secondary" }>`
  flex: 1;
  padding-vertical: 12px;
  padding-horizontal: 20px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.variant === "primary" ? "#EF4444" : "#F3F4F6"};
  min-height: 48px;
`;

const ButtonText = styled.Text<{ variant: "primary" | "secondary" }>`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.variant === "primary" ? "#FFFFFF" : "#374151")};
`;

const LoadingIndicator = styled.ActivityIndicator`
  margin-right: 8px;
`;

export default function ConfirmationModal({
  visible,
  title,
  message,
  confirmText = "Eliminar",
  cancelText = "Cancelar",
  onConfirm,
  onCancel,
  loading = false,
}: IConfirmationModalProps) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <Overlay onPress={onCancel}>
        <Pressable onPress={(e) => e.stopPropagation()}>
          <ModalContainer>
            <Title>{title}</Title>
            <Message>{message}</Message>
            <ButtonsContainer>
              <Button
                variant="secondary"
                onPress={onCancel}
                disabled={loading}
                style={{ opacity: loading ? 0.6 : 1 }}
              >
                <ButtonText variant="secondary">{cancelText}</ButtonText>
              </Button>
              <Button
                variant="primary"
                onPress={onConfirm}
                disabled={loading}
                style={{ opacity: loading ? 0.6 : 1 }}
              >
                {loading ? (
                  <LoadingIndicator size="small" color="#FFFFFF" />
                ) : (
                  <ButtonText variant="primary">{confirmText}</ButtonText>
                )}
              </Button>
            </ButtonsContainer>
          </ModalContainer>
        </Pressable>
      </Overlay>
    </Modal>
  );
}
