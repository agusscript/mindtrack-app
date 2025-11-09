import React, { useState } from "react";
import {
  KeyboardTypeOptions,
  StyleProp,
  TextStyle,
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Field, FieldProps, FormikErrors, FormikTouched } from "formik";
import { Ionicons } from "@expo/vector-icons";

interface ICustomInputProps {
  formatValue?: (value: string) => string;
  keyboardType?: KeyboardTypeOptions;
  errors: FormikErrors<Record<string, string>>;
  touched: FormikTouched<Record<string, string>>;
  name: string;
  placeholder: string;
  label: string;
  type?: string;
  hideErrorMessage?: boolean;
  editable?: boolean;
  style?: StyleProp<TextStyle>;
  autoCapitalize?: "none" | "words" | "sentences" | "characters";
}

export default function CustomInput(props: ICustomInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Field name={props.name}>
      {({ field, form }: FieldProps) => {
        const { name, value, onChange, onBlur } = field;
        const { errors, touched } = form;
        const hasError = errors[name] && touched[name];
        const isPassword = props.type === "password";

        return (
          <View style={styles.container}>
            <Text style={styles.label}>{props.label}</Text>

            <View style={[styles.inputWrapper, hasError && styles.inputError]}>
              <TextInput
                value={value}
                onChangeText={onChange(name)}
                onBlur={onBlur(name)}
                style={[styles.input, props.style]}
                placeholder={props.placeholder}
                placeholderTextColor="#9CA3AF"
                autoCapitalize={props.autoCapitalize || "none"}
                keyboardType={props.keyboardType || "default"}
                editable={props.editable !== false}
                secureTextEntry={isPassword && !showPassword}
                returnKeyType="next"
              />

              {isPassword && (
                <TouchableOpacity
                  onPress={() => setShowPassword((prev) => !prev)}
                  style={styles.iconContainer}
                >
                  <Ionicons
                    name={showPassword ? "eye-off" : "eye"}
                    size={22}
                    color="#6B7280"
                  />
                </TouchableOpacity>
              )}
            </View>

            {!props.hideErrorMessage &&
              hasError &&
              typeof errors[name] === "string" && (
                <Text style={styles.errorText}>{errors[name]}</Text>
              )}
          </View>
        );
      }}
    </Field>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 14,
  },
  iconContainer: {
    paddingHorizontal: 8,
  },
  inputError: {
    borderColor: "#EF4444",
  },
  errorText: {
    color: "#EF4444",
    fontSize: 14,
    marginTop: 4,
    marginLeft: 4,
  },
});
