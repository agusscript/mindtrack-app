import SignInForm from "@/components/auth/SignInForm";
import CloseButton from "@/components/CloseButton";
import { Colors } from "@/constants/theme";
import { useAuthProvider } from "@/src/hooks/useAuthProvider";
import { signInSchema } from "@/src/schemas/signin.schema";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";

export default function SignInScreen() {
  const { handleSignIn, isLoadingSignIn, user } = useAuthProvider();
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
          email: "",
          password: "",
        }}
        validationSchema={signInSchema}
        onSubmit={async (values) => {
          try {
            await handleSignIn(values.email, values.password);
          } catch (error) {
            console.error("Error signing in:", error);
          }
        }}
      >
        {({ handleSubmit, values, errors, touched }) => (
          <View style={styles.formContainer}>
            <SignInForm
              values={values}
              errors={errors}
              loading={isLoadingSignIn}
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
