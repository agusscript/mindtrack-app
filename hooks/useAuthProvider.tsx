import { useState, useCallback } from "react";
import {
  ISignUpFormValues,
  ISignInFormValues,
  IUser,
  IAuthState,
} from "@/src/interfaces/IAuth";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

export const useAuthProvider = () => {
  const [authState, setAuthState] = useState<IAuthState>({
    user: null,
    isLoading: false,
    isAuthenticated: false,
  });

  const handleSignUp = useCallback(async (values: ISignUpFormValues) => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true }));

      await new Promise(resolve => setTimeout(resolve, 1000));

      const newUser: IUser = {
        id: Math.floor(Math.random() * 1000),
        name: values.name,
        email: values.email,
      };

      setAuthState({
        user: newUser,
        isLoading: false,
        isAuthenticated: true,
      });

      Toast.show({
        type: 'success',
        text1: '¡Registro exitoso!',
        text2: `Bienvenido ${newUser.name}`,
        position: 'top',
        visibilityTime: 3000,
      });

      setTimeout(() => {
        router.push('/(tabs)/dashboard');
      }, 1500);

      return newUser;
    } catch (error) {
      console.error("Error en registro:", error);
      setAuthState((prev) => ({ ...prev, isLoading: false }));
      throw error;
    }
  }, []);

  const handleSignIn = useCallback(async (values: ISignInFormValues) => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true }));

      await new Promise(resolve => setTimeout(resolve, 1000));

      const user: IUser = {
        id: Math.floor(Math.random() * 1000),
        name: "Usuario Demo",
        email: values.email,
      };

      setAuthState({
        user,
        isLoading: false,
        isAuthenticated: true,
      });

      Toast.show({
        type: 'success',
        text1: '¡Bienvenido de vuelta!',
        text2: `Hola ${user.name}`,
        position: 'top',
        visibilityTime: 3000,
      });

      setTimeout(() => {
        router.push('/(tabs)/dashboard');
      }, 1500);
    } catch (error) {
      console.error("Error en login:", error);
      setAuthState((prev) => ({ ...prev, isLoading: false }));
      throw error;
    }
  }, []);

  const handleSignOut = useCallback(async () => {
    try {
      Toast.show({
        type: 'info',
        text1: '¡Hasta luego!',
        text2: 'Has cerrado sesión correctamente',
        position: 'top',
        visibilityTime: 2000,
      });

      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });

      router.replace("/");
    } catch (error) {
      console.error("Error en logout:", error);
    }
  }, []);

  return {
    ...authState,
    loadingState: authState.isLoading,
    handleSignUp,
    handleSignIn,
    handleSignOut,
  };
};
