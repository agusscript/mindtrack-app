import SignUpForm from "@/components/auth/SignUpForm";
import CloseButton from "@/components/CloseButton";
import { Colors } from "@/constants/theme";
import { useAuthProvider } from "@/src/hooks/useAuthProvider";
import { signUpSchema } from "@/src/schemas/signup.schema";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";

export default function SignUpScreen() {
  const { handleSignUp, isLoadingSignUp, user } = useAuthProvider();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/(tabs)/dashboard");
    }
  }, [user, router]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <CloseButton onPress={() => router.push("/")} />
      </View>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        validationSchema={signUpSchema}
        onSubmit={async (values) => {
          try {
            await handleSignUp(values);
          } catch (error) {
            console.error("Error signing up:", error);
          }
        }}
      >
        {({ handleSubmit, values, errors, touched }) => (
          <View style={styles.formContainer}>
            <SignUpForm
              values={values}
              errors={errors}
              loading={isLoadingSignUp}
              touched={touched}
              handleSubmit={handleSubmit}
            />
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    alignItems: "flex-end",
  },
  formContainer: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
});
