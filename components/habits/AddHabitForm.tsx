import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { View } from "react-native";
import CustomInput from "@/components/auth/CustomInput";
import CustomButton from "@/components/CustomButton";
import styled from "styled-components/native";

interface IAddHabitFormProps {
  onSubmit: (values: { title: string }) => void;
  isLoading?: boolean;
}

const FormContainer = styled.View`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 16px;
  border-width: 1px;
  border-color: #e5e7eb;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 3px;
  elevation: 2;
`;

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required("El título es requerido")
    .min(3, "El título debe tener al menos 3 caracteres")
    .max(100, "El título no puede exceder 100 caracteres"),
});

export default function AddHabitForm({
  onSubmit,
  isLoading = false,
}: IAddHabitFormProps) {
  return (
    <FormContainer>
      <Formik
        initialValues={{ title: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          onSubmit(values);
          resetForm();
        }}
      >
        {({ handleSubmit, errors, touched }) => (
          <View>
            <CustomInput
              name="title"
              label="Título del hábito"
              placeholder="Ej: Meditar"
              errors={errors}
              touched={touched}
            />

            <CustomButton
              text="Agregar Hábito"
              onPress={handleSubmit}
              loading={isLoading}
              disabled={isLoading}
            />
          </View>
        )}
      </Formik>
    </FormContainer>
  );
}
