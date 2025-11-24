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
  Modal,
  Pressable,
} from "react-native";
import CloseButton from "@/components/CloseButton";
import CustomButton from "@/components/CustomButton";
import { AuthContext } from "@/src/context/AuthContext";
import { IHabit } from "@/src/interfaces/IHabit";
import { habitService } from "@/src/services/habit.service";
import { notificationService } from "@/src/services/notification.service";
import { sortByDateDesc } from "@/src/utils/sortByDate";
import HabitItem from "@/components/habits/HabitItem";
import AddHabitModal from "@/components/habits/AddHabitModal";
import TimePickerModal from "@/components/habits/TimePickerModal";
import ConfirmationModal from "@/components/ConfirmationModal";
import Toast from "react-native-toast-message";
import { useNotificationsSetup } from "@/src/hooks/useNotificationsSetup";

const Container = styled.View`
  flex: 1;
  background-color: ${Colors.light.background};
  position: relative;
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

const FloatingButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background-color: ${Colors.light.buttonEnabled};
  justify-content: center;
  align-items: center;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 4px;
  elevation: 8;
  z-index: 10;
`;

const FloatingButtonText = styled.Text`
  font-size: 28px;
  color: #ffffff;
  font-weight: 300;
  line-height: 32px;
`;

export default function HabitsListScreen() {
  useNotificationsSetup();
  const router = useRouter();
  const { user } = React.useContext(AuthContext)!;
  const [habits, setHabits] = useState<IHabit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [isSavingNotification, setIsSavingNotification] = useState(false);
  const [selectedHabitId, setSelectedHabitId] = useState<number | null>(null);
  const [selectedHabitTime, setSelectedHabitTime] = useState<string | null>(
    null
  );
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);
  const [habitToDelete, setHabitToDelete] = useState<{
    id: number;
    title: string;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [addHabitModalVisible, setAddHabitModalVisible] = useState(false);

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

      await notificationService.restoreHabitNotifications(
        sortedHabits.map((h) => ({
          id: h.id,
          title: h.title,
          notificationTime: h.notificationTime ?? null,
          isActive: h.isActive,
        }))
      );
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
      setAddHabitModalVisible(false);
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

      if (!isActive) {
        await notificationService.cancelHabitNotification(id);
      } else if (updatedHabit.notificationTime) {
        await notificationService.scheduleHabitNotification({
          habitId: id,
          habitTitle: updatedHabit.title,
          time: updatedHabit.notificationTime,
        });
      }
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

  const handleDelete = (id: number) => {
    const habit = habits.find((h) => h.id === id);
    if (habit) {
      setHabitToDelete({ id: habit.id, title: habit.title });
      setDeleteConfirmationVisible(true);
    }
  };

  const handleConfirmDelete = async () => {
    if (!habitToDelete) return;

    setIsDeleting(true);
    try {
      // Cancelar notificación antes de eliminar
      await notificationService.cancelHabitNotification(habitToDelete.id);
      await habitService.delete(habitToDelete.id);
      setHabits((prev) =>
        prev.filter((habit) => habit.id !== habitToDelete.id)
      );
      Toast.show({
        type: "success",
        text1: "Hábito eliminado",
        text2: "El hábito se ha eliminado correctamente",
        position: "top",
        visibilityTime: 2000,
      });
      setDeleteConfirmationVisible(false);
      setHabitToDelete(null);
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
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmationVisible(false);
    setHabitToDelete(null);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchHabits();
  };

  const handleNotificationPress = (id: number) => {
    const habit = habits.find((h) => h.id === id);
    if (habit) {
      setSelectedHabitId(id);
      setSelectedHabitTime(habit.notificationTime || null);
      setTimePickerVisible(true);
    }
  };

  const handleSaveNotification = async (time?: string) => {
    if (!selectedHabitId) return;

    setIsSavingNotification(true);
    try {
      const habit = habits.find((h) => h.id === selectedHabitId);
      if (!habit) return;

      const updatedHabit = await habitService.update(selectedHabitId, {
        notificationTime: time || undefined,
      });
      setHabits((prev) =>
        prev.map((habit) =>
          habit.id === selectedHabitId ? updatedHabit : habit
        )
      );

      if (time && updatedHabit.isActive) {
        await notificationService.scheduleHabitNotification({
          habitId: selectedHabitId,
          habitTitle: updatedHabit.title,
          time: time,
        });
        Toast.show({
          type: "success",
          text1: "Notificación configurada",
          text2: `Hora establecida: ${time}`,
          position: "top",
          visibilityTime: 2000,
        });
      } else {
        await notificationService.cancelHabitNotification(selectedHabitId);
        Toast.show({
          type: "success",
          text1: "Notificación desactivada",
          text2: "La notificación se ha eliminado correctamente",
          position: "top",
          visibilityTime: 2000,
        });
      }

      handleCloseTimePicker();
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Error al actualizar la notificación";
      Toast.show({
        type: "error",
        text1: "Error",
        text2: errorMessage,
        position: "top",
        visibilityTime: 3000,
      });
    } finally {
      setIsSavingNotification(false);
    }
  };

  const handleDisableNotification = async () => {
    if (!selectedHabitId) return;

    setIsSavingNotification(true);
    try {
      await notificationService.cancelHabitNotification(selectedHabitId);

      const updatedHabit = await habitService.update(selectedHabitId, {
        notificationTime: null,
      });

      setHabits((prev) =>
        prev.map((habit) =>
          habit.id === selectedHabitId ? updatedHabit : habit
        )
      );

      Toast.show({
        type: "success",
        text1: "Notificación desactivada",
        text2: "La notificación se ha desactivado correctamente",
        position: "top",
        visibilityTime: 2000,
      });

      handleCloseTimePicker();
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Error al desactivar la notificación";
      Toast.show({
        type: "error",
        text1: "Error",
        text2: errorMessage,
        position: "top",
        visibilityTime: 3000,
      });
    } finally {
      setIsSavingNotification(false);
    }
  };

  const handleCloseTimePicker = () => {
    setTimePickerVisible(false);
    setSelectedHabitId(null);
    setSelectedHabitTime(null);
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

          <FlatList
            data={habits}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <HabitItem
                habit={item}
                onToggleActive={handleToggleActive}
                onNotificationPress={handleNotificationPress}
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

        <Modal
          visible={timePickerVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={handleCloseTimePicker}
        >
          <Pressable
            style={{
              flex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              justifyContent: "flex-end",
            }}
            onPress={handleCloseTimePicker}
          >
            <Pressable onPress={(e) => e.stopPropagation()}>
              <TimePickerModal
                visible={timePickerVisible}
                onClose={handleCloseTimePicker}
                initialTime={selectedHabitTime}
                onSave={handleSaveNotification}
                loading={isSavingNotification}
                onDisableNotification={handleDisableNotification}
              />
            </Pressable>
          </Pressable>
        </Modal>
      </SafeArea>

      <FloatingButton onPress={() => setAddHabitModalVisible(true)}>
        <FloatingButtonText>+</FloatingButtonText>
      </FloatingButton>

      <AddHabitModal
        visible={addHabitModalVisible}
        onClose={() => setAddHabitModalVisible(false)}
        onSubmit={handleAddHabit}
        isLoading={isAdding}
      />

      <ConfirmationModal
        visible={deleteConfirmationVisible}
        title="Eliminar hábito"
        message={`¿Estás seguro de que deseas eliminar el hábito "${habitToDelete?.title}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        loading={isDeleting}
      />
    </Container>
  );
}
