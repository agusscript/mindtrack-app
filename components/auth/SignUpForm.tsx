import { FormikErrors, FormikTouched } from "formik";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { ISignUpFormValues } from "@/src/interfaces/IAuth";
import { Colors } from "@/constants/theme";
import CustomInput from "./CustomInput";
import CustomButton from "../CustomButton";

interface IPasswordFormProps {
  values: ISignUpFormValues;
  errors: FormikErrors<ISignUpFormValues>;
  touched: FormikTouched<ISignUpFormValues>;
  loading: boolean;
  handleSubmit: () => void;
}

export default function SignUpForm({
  errors,
  touched,
  values,
  loading,
  handleSubmit,
}: IPasswordFormProps) {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: "padding", android: "height" })}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Crear una cuenta</Text>
          <Text style={styles.subtitle}>
            Únete a MindTrack y comienza a mejorar tu bienestar mental
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <CustomInput
            errors={errors}
            touched={touched}
            name="name"
            placeholder="Nombre completo"
            label="Nombre"
          />
          <CustomInput
            errors={errors}
            touched={touched}
            name="email"
            placeholder="correo@ejemplo.com"
            label="Correo electrónico"
            keyboardType="email-address"
          />
          <CustomInput
            errors={errors}
            touched={touched}
            hideErrorMessage
            name="password"
            type="password"
            placeholder="Mínimo 6 caracteres"
            label="Contraseña"
          />
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            text="Registrarse"
            loading={loading}
            disabled={loading}
            onPress={() => {
              Keyboard.dismiss();
              handleSubmit();
            }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 40,
    paddingTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.light.text,
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.text,
    textAlign: "center",
    lineHeight: 24,
    opacity: 0.7,
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginBottom: 30,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 40,
  },
});
