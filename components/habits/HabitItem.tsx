import React from "react";
import { Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { IHabit } from "@/src/interfaces/IHabit";
import styled from "styled-components/native";

interface IHabitItemProps {
  habit: IHabit;
  onToggleActive: (id: number, isActive: boolean) => void;
  onNotificationPress: (id: number) => void;
  onDelete: (id: number) => void;
}

const HabitContainer = styled.View<{ isActive: boolean }>`
  flex-direction: row;
  align-items: center;
  background-color: #ffffff;
  padding-vertical: 14px;
  padding-horizontal: 8px;
  margin-bottom: 12px;
  border-radius: 12px;
  border-width: 1px;
  border-color: ${(props) => (props.isActive ? "#E5E7EB" : "#D1D5DB")};
  opacity: ${(props) => (props.isActive ? 1 : 0.7)};
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 3px;
  elevation: 2;
`;

const ToggleContainer = styled.View`
  margin-right: 12px;
`;

const HabitContent = styled.View`
  flex: 1;
`;

const HabitTitle = styled.Text<{ isActive: boolean }>`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  opacity: ${(props) => (props.isActive ? 1 : 0.6)};
`;

const NotificationButton = styled.TouchableOpacity<{ disabled: boolean }>`
  padding: 8px;
  margin-right: 8px;
  opacity: ${(props) => (props.disabled ? 0.4 : 1)};
`;

const DeleteButton = styled.TouchableOpacity`
  padding: 8px;
`;

export default function HabitItem({
  habit,
  onToggleActive,
  onNotificationPress,
  onDelete,
}: IHabitItemProps) {
  const hasNotification = !!habit.notificationTime;

  return (
    <HabitContainer isActive={habit.isActive}>
      <ToggleContainer>
        <Switch
          value={habit.isActive}
          onValueChange={(value) => onToggleActive(habit.id, value)}
          trackColor={{ false: "#D1D5DB", true: "#007AFF" }}
          thumbColor={habit.isActive ? "#FFFFFF" : "#F3F4F6"}
          style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }] }}
        />
      </ToggleContainer>

      <HabitContent>
        <HabitTitle isActive={habit.isActive}>{habit.title}</HabitTitle>
      </HabitContent>

      <NotificationButton
        disabled={!habit.isActive}
        onPress={() => {
          if (habit.isActive) {
            onNotificationPress(habit.id);
          }
        }}
      >
        <Ionicons
          name={hasNotification ? "notifications" : "notifications-outline"}
          size={24}
          color={
            !habit.isActive
              ? "#D1D5DB"
              : hasNotification
              ? "#007AFF"
              : "#9CA3AF"
          }
        />
      </NotificationButton>

      <DeleteButton onPress={() => onDelete(habit.id)}>
        <Ionicons name="trash-outline" size={20} color="#EF4444" />
      </DeleteButton>
    </HabitContainer>
  );
}
