import React, { useState, useEffect, useCallback } from "react";
import { Colors } from "@/constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import styled from "styled-components/native";
import {
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Text,
} from "react-native";
import CloseButton from "@/components/CloseButton";
import CustomButton from "@/components/CustomButton";
import { AuthContext } from "@/src/context/AuthContext";
import { IHabit } from "@/src/interfaces/IHabit";
import { habitService } from "@/src/services/habit.service";
import { sortByDateDesc } from "@/src/utils/sortByDate";
import HabitItem from "@/components/habits/HabitItem";
import AddHabitForm from "@/components/habits/AddHabitForm";
import Toast from "react-native-toast-message";

const Container = styled.View`
  flex: 1;
  background-color: ${Colors.light.background};
`;

const SafeArea = styled(SafeAreaView)`
  flex: 1;
`;

const HeaderContainer = styled.View`
  padding-horizontal: 24px;
  padding-vertical: 16px;
  align-items: flex-end;
  background-color: ${Colors.light.background};
`;

const ContentContainer = styled.View`
  flex: 1;
  padding-horizontal: 24px;
`;

const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: #111827;
  margin-bottom: 8px;
  margin-top: 8px;
`;

const Subtitle = styled.Text`
  font-size: 16px;
  color: #6b7280;
  margin-bottom: 20px;
`;

const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-vertical: 60px;
`;

const EmptyText = styled.Text`
  font-size: 18px;
  color: #9ca3af;
  text-align: center;
  margin-top: 16px;
`;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ErrorContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 24px;
`;

const ErrorText = styled.Text`
  font-size: 16px;
  color: #ef4444;
  text-align: center;
  margin-bottom: 16px;
`;

export default function HabitsListScreen() {
  const router = useRouter();
  const { user } = React.useContext(AuthContext)!;
  const [habits, setHabits] = useState<IHabit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHabits = useCallback(async () => {
    if (!user?.id) {
      setError("Usuario no autenticado");
      setIsLoading(false);
      return;
    }

    try {
      setError(null);
      const fetchedHabits = await habitService.getAllByUserId(user.id);
      const sortedHabits = sortByDateDesc(fetchedHabits);
      setHabits(sortedHabits);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error al cargar los hábitos";
      setError(errorMessage);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: errorMessage,
        position: "top",
        visibilityTime: 3000,
      });
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchHabits();
  }, [fetchHabits]);

  const handleAddHabit = async (values: { title: string }) => {
    if (!user?.id) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Usuario no autenticado",
        position: "top",
        visibilityTime: 3000,
      });
      return;
    }

    setIsAdding(true);
    try {
      const newHabit = await habitService.create({
        title: values.title,
        userId: user.id,
      });
      setHabits((prev) => [newHabit, ...prev]);
      Toast.show({
        type: "success",
        text1: "¡Hábito agregado!",
        text2: "El hábito se ha creado correctamente",
        position: "top",
        visibilityTime: 2000,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error al crear el hábito";
      Toast.show({
        type: "error",
        text1: "Error",
        text2: errorMessage,
        position: "top",
        visibilityTime: 3000,
      });
    } finally {
      setIsAdding(false);
    }
  };

  const handleToggleActive = async (id: number, isActive: boolean) => {
    try {
      const updatedHabit = await habitService.update(id, { isActive });
      setHabits((prev) =>
        prev.map((habit) => (habit.id === id ? updatedHabit : habit))
      );
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error al actualizar el hábito";
      Toast.show({
        type: "error",
        text1: "Error",
        text2: errorMessage,
        position: "top",
        visibilityTime: 3000,
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await habitService.delete(id);
      setHabits((prev) => prev.filter((habit) => habit.id !== id));
      Toast.show({
        type: "success",
        text1: "Hábito eliminado",
        text2: "El hábito se ha eliminado correctamente",
        position: "top",
        visibilityTime: 2000,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error al eliminar el hábito";
      Toast.show({
        type: "error",
        text1: "Error",
        text2: errorMessage,
        position: "top",
        visibilityTime: 3000,
      });
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchHabits();
  };

  if (isLoading) {
    return (
      <Container>
        <SafeArea>
          <HeaderContainer>
            <CloseButton onPress={() => router.push("/")} />
          </HeaderContainer>
          <LoadingContainer>
            <ActivityIndicator size="large" color={Colors.light.tint} />
          </LoadingContainer>
        </SafeArea>
      </Container>
    );
  }

  if (error && habits.length === 0) {
    return (
      <Container>
        <SafeArea>
          <HeaderContainer>
            <CloseButton onPress={() => router.push("/")} />
          </HeaderContainer>
          <ErrorContainer>
            <ErrorText>{error}</ErrorText>
            <CustomButton text="Reintentar" onPress={fetchHabits} />
          </ErrorContainer>
        </SafeArea>
      </Container>
    );
  }

  return (
    <Container>
      <SafeArea>
        <HeaderContainer>
          <CloseButton onPress={() => router.push("/")} />
        </HeaderContainer>

        <ContentContainer>
          <Title>Mis Hábitos</Title>
          <Subtitle>
            {habits.length === 0
              ? "No tienes hábitos aún"
              : `${habits.length} ${
                  habits.length === 1 ? "hábito" : "hábitos"
                }`}
          </Subtitle>

          <AddHabitForm onSubmit={handleAddHabit} isLoading={isAdding} />

          <FlatList
            data={habits}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <HabitItem
                habit={item}
                onToggleActive={handleToggleActive}
                onNotificationPress={() => {}}
                onDelete={handleDelete}
              />
            )}
            ListEmptyComponent={
              <EmptyContainer>
                <Text style={{ fontSize: 48 }}>🎯</Text>
                <EmptyText>No hay hábitos aún</EmptyText>
                <EmptyText style={{ fontSize: 14, marginTop: 8 }}>
                  Agrega un nuevo hábito para comenzar
                </EmptyText>
              </EmptyContainer>
            }
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
                tintColor={Colors.light.tint}
              />
            }
            contentContainerStyle={{
              paddingBottom: 24,
              flexGrow: 1,
            }}
            showsVerticalScrollIndicator={false}
          />
        </ContentContainer>
      </SafeArea>
    </Container>
  );
}
