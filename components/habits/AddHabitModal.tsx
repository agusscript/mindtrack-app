import React from "react";
import { Modal, Pressable } from "react-native";
import styled from "styled-components/native";
import { Colors } from "@/constants/theme";
import { Formik } from "formik";
import * as Yup from "yup";
import CustomInput from "@/components/auth/CustomInput";
import CustomButton from "@/components/CustomButton";

interface IAddHabitModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: { title: string }) => void;
  isLoading?: boolean;
}

const ModalContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #ffffff;
  padding: 24px;
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
  margin-bottom: 24px;
`;

const CloseButton = styled.TouchableOpacity`
  padding: 4px;
`;

const CloseButtonText = styled.Text`
  font-size: 24px;
  color: ${Colors.light.text};
  font-weight: 300;
`;

const Title = styled.Text`
  font-size: 28px;
  color: ${Colors.light.text};
  font-weight: 600;
  margin-bottom: 8px;
`;

const Description = styled.Text`
  font-size: 15px;
  color: #6b7280;
  margin-bottom: 24px;
`;

const FormContainer = styled.View`
  margin-top: 8px;
`;

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required("El título es requerido")
    .min(3, "El título debe tener al menos 3 caracteres")
    .max(100, "El título no puede exceder 100 caracteres"),
});

export default function AddHabitModal({
  visible,
  onClose,
  onSubmit,
  isLoading = false,
}: IAddHabitModalProps) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          justifyContent: "flex-end",
        }}
        onPress={onClose}
      >
        <Pressable onPress={(e) => e.stopPropagation()}>
          <ModalContainer>
            <HeaderContainer>
              <Title>Nuevo Hábito</Title>
              <CloseButton onPress={onClose}>
                <CloseButtonText>✕</CloseButtonText>
              </CloseButton>
            </HeaderContainer>

            <Description>
              Agrega un hábito para comenzar a seguirlo diariamente
            </Description>

            <FormContainer>
              <Formik
                initialValues={{ title: "" }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                  onSubmit(values);
                  resetForm();
                  onClose();
                }}
              >
                {({ handleSubmit, errors, touched }) => (
                  <>
                    <CustomInput
                      name="title"
                      label="Título del hábito"
                      placeholder="Ej: Meditar, Ejercitar, Leer..."
                      errors={errors}
                      touched={touched}
                    />

                    <CustomButton
                      text="Agregar Hábito"
                      onPress={handleSubmit}
                      loading={isLoading}
                      disabled={isLoading}
                    />
                  </>
                )}
              </Formik>
            </FormContainer>
          </ModalContainer>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
