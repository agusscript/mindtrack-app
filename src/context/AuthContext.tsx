import { createContext, useCallback, useState } from "react";
import { IReactChildrenProps } from "@/src/interfaces/IReactChildren";
import { useRouter } from "expo-router";
import {
  ISignUpFormValues,
  IUser,
} from "@/src/interfaces/IAuth";
import { IAuthContext } from "@/src/interfaces/IAuthContext";
import { apiService } from "@/src/services/api.service";
import { authService } from "@/src/services/auth.service";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";

export const AuthContext = createContext<IAuthContext | null>(null);

export function getLocalStorageItem(key: string) {
  return SecureStore.getItemAsync(key);
}

export function setLocalStorageItem(key: string, value: string) {
  return SecureStore.setItemAsync(key, value);
}

export function removeLocalStorageItem(key: string) {
  return SecureStore.deleteItemAsync(key);
}

export const AuthProvider = ({ children }: IReactChildrenProps) => {
  const [isLoadingSignIn, setIsLoadingSignIn] = useState(false);
  const [isLoadingSignUp, setIsLoadingSignUp] = useState(false);
  const [isLoadingSignOut, setIsLoadingSignOut] = useState(false);
  const [user, setUser] = useState<IUser | null | undefined>(undefined);
  const navigate = useRouter();

  const handleSignIn = useCallback(
    (email: string, password: string) => {
      async function signIn(email: string, password: string) {
        setIsLoadingSignIn(true);
        try {
          const { accessToken, refreshToken, user } = await authService.signIn({
            email,
            password,
          });
          setLocalStorageItem("accessToken", accessToken);
          setLocalStorageItem("refreshToken", refreshToken);
          setLocalStorageItem("email", email);
          apiService.setAuthentication(accessToken);
          setUser(user);
          Toast.show({
            type: "success",
            text1: "¡Inicio de sesión exitoso!",
            text2: `Bienvenido ${user.name}`,
            position: "top",
            visibilityTime: 3000,
          });
        } catch (error: unknown) {
          Toast.show({
            type: "error",
            text1: "Error al iniciar sesión",
            text2:
              error instanceof Error
                ? error.message
                : `Error desconocido: ${error}`,
            position: "top",
            visibilityTime: 3000,
          });
        } finally {
          setIsLoadingSignIn(false);
        }
      }
      return signIn(email, password);
    },
    []
  );

  const handleSignUp = useCallback(
    (signupValues: ISignUpFormValues) => {
      async function signUp(signupValues: ISignUpFormValues) {
        setIsLoadingSignUp(true);
        try {
          const { accessToken, refreshToken, user } = await authService.signUp(signupValues);
  
          await setLocalStorageItem("accessToken", accessToken);
          await setLocalStorageItem("refreshToken", refreshToken);
          await setLocalStorageItem("email", signupValues.email);
  
          apiService.setAuthentication(accessToken);
          setUser(user);
  
          Toast.show({
            type: "success",
            text1: "Registro exitoso",
            text2: "Bienvenido a MindTrack App",
            position: "top",
            visibilityTime: 3000,
          });
  
          navigate.push("/(tabs)/dashboard");
        } catch (error: unknown) {
          Toast.show({
            type: "error",
            text1: "Error al registrar",
            text2:
              error instanceof Error
                ? error.message
                : `Error desconocido: ${error}`,
            position: "top",
            visibilityTime: 3000,
          });
        } finally {
          setIsLoadingSignUp(false);
        }
      }
      return signUp(signupValues);
    },
    [navigate]
  );
  

  const handleSignOut = useCallback(async () => {
    try {
      const refreshToken = await SecureStore.getItemAsync("refreshToken");

      if (refreshToken) await authService.signOut({ refreshToken });
      
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error al cerrar sesión",
        text2:
          error instanceof Error
            ? error.message
            : `Error desconocido: ${error}`,
        position: "top",
        visibilityTime: 3000,
      });
    } finally {
      setIsLoadingSignOut(false);
    }
  
    await removeLocalStorageItem("accessToken");
    await removeLocalStorageItem("refreshToken");
    await removeLocalStorageItem("email");
  
    setUser(null);
  
    Toast.show({
      type: "success",
      text1: "¡Hasta luego!",
      text2: "Has cerrado sesión correctamente",
      position: "top",
      visibilityTime: 2000,
    });
  
    navigate.replace("/(tabs)/sign-in");
  }, [navigate]);
  

  const contextValue = {
    isLoadingSignIn,
    isLoadingSignUp,
    isLoadingSignOut,
    handleSignIn,
    handleSignOut,
    handleSignUp,
    user,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
