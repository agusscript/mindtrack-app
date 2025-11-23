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
import { ITask } from "@/src/interfaces/ITask";
import { taskService } from "@/src/services/task.service";
import { sortByDateDesc } from "@/src/utils/sortByDate";
import TaskItem from "@/components/tasks/TaskItem";
import AddTaskForm from "@/components/tasks/AddTaskForm";
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

export default function TasksListScreen() {
  const router = useRouter();
  const { user } = React.useContext(AuthContext)!;
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    if (!user?.id) {
      setError("Usuario no autenticado");
      setIsLoading(false);
      return;
    }

    try {
      setError(null);
      const fetchedTasks = await taskService.getAllByUserId(user.id);
      const sortedTasks = sortByDateDesc(fetchedTasks);
      setTasks(sortedTasks);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error al cargar las tareas";
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
    fetchTasks();
  }, [fetchTasks]);

  const handleAddTask = async (values: { title: string }) => {
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
      const newTask = await taskService.create({
        title: values.title,
        userId: user.id,
      });
      setTasks((prev) => [newTask, ...prev]);
      Toast.show({
        type: "success",
        text1: "¡Tarea agregada!",
        text2: "La tarea se ha creado correctamente",
        position: "top",
        visibilityTime: 2000,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error al crear la tarea";
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

  const handleToggleComplete = async (id: number, isCompleted: boolean) => {
    try {
      const updatedTask = await taskService.update(id, { isCompleted });
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updatedTask : task))
      );
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error al actualizar la tarea";
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
      await taskService.delete(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
      Toast.show({
        type: "success",
        text1: "Tarea eliminada",
        text2: "La tarea se ha eliminado correctamente",
        position: "top",
        visibilityTime: 2000,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error al eliminar la tarea";
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
    fetchTasks();
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

  if (error && tasks.length === 0) {
    return (
      <Container>
        <SafeArea>
          <HeaderContainer>
            <CloseButton onPress={() => router.push("/")} />
          </HeaderContainer>
          <ErrorContainer>
            <ErrorText>{error}</ErrorText>
            <CustomButton
              text="Reintentar"
              onPress={fetchTasks}
            />
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
          <Title>Mis Tareas</Title>
          <Subtitle>
            {tasks.length === 0
              ? "No tienes tareas aún"
              : `${tasks.length} ${tasks.length === 1 ? "tarea" : "tareas"}`}
          </Subtitle>

          <AddTaskForm onSubmit={handleAddTask} isLoading={isAdding} />

          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TaskItem
                task={item}
                onToggleComplete={handleToggleComplete}
                onDelete={handleDelete}
              />
            )}
            ListEmptyComponent={
              <EmptyContainer>
                <Text style={{ fontSize: 48 }}>📝</Text>
                <EmptyText>No hay tareas aún</EmptyText>
                <EmptyText style={{ fontSize: 14, marginTop: 8 }}>
                  Agrega una nueva tarea para comenzar
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
