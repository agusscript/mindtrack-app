import { Field, FieldProps, FormikErrors, FormikTouched } from "formik";
import React from "react";
import {
  KeyboardTypeOptions,
  StyleProp,
  TextStyle,
  TextInput,
  View,
  Text,
  StyleSheet,
} from "react-native";

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
  return (
    <Field name={props.name}>
      {({ field, form }: FieldProps) => {
        const { name, value, onChange, onBlur } = field;
        const { errors, touched } = form;
        const hasError = errors[name] && touched[name];

        return (
          <View style={styles.container}>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput
              value={value}
              onChangeText={onChange(name)}
              onBlur={onBlur(name)}
              style={[styles.input, hasError && styles.inputError, props.style]}
              placeholder={props.placeholder}
              placeholderTextColor="#9CA3AF"
              autoCapitalize={props.autoCapitalize || "none"}
              keyboardType={props.keyboardType || "default"}
              editable={props.editable !== false}
              secureTextEntry={props.type === "password"}
              returnKeyType="next"
              blurOnSubmit={false}
            />
            {!props.hideErrorMessage && hasError && typeof errors[name] === "string" && (
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
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
    minHeight: 50,
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
