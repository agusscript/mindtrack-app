import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { ITask } from "@/src/interfaces/ITask";
import styled from "styled-components/native";

interface ITaskItemProps {
  task: ITask;
  onToggleComplete: (id: number, isCompleted: boolean) => void;
  onDelete: (id: number) => void;
}

const TaskContainer = styled.View<{ isCompleted: boolean }>`
  flex-direction: row;
  align-items: center;
  background-color: #ffffff;
  padding: 16px;
  margin-bottom: 12px;
  border-radius: 12px;
  border-width: 1px;
  border-color: ${(props) => (props.isCompleted ? "#D1D5DB" : "#E5E7EB")};
  opacity: ${(props) => (props.isCompleted ? 0.7 : 1)};
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 3px;
  elevation: 2;
`;

const CheckboxContainer = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  border-width: 2px;
  border-color: #007AFF;
  margin-right: 12px;
  justify-content: center;
  align-items: center;
`;

const TaskContent = styled.View`
  flex: 1;
`;

const TaskTitle = styled.Text<{ isCompleted: boolean }>`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  text-decoration-line: ${(props) => (props.isCompleted ? "line-through" : "none")};
`;

const ActionButton = styled.TouchableOpacity`
  padding: 8px;
  margin-left: 8px;
`;

export default function TaskItem({
  task,
  onToggleComplete,
  onDelete,
}: ITaskItemProps) {
  return (
    <TaskContainer isCompleted={task.isCompleted}>
      <CheckboxContainer
        onPress={() => onToggleComplete(task.id, !task.isCompleted)}
      >
        {task.isCompleted && (
          <Ionicons name="checkmark" size={16} color="#007AFF" />
        )}
      </CheckboxContainer>

      <TaskContent>
        <TaskTitle isCompleted={task.isCompleted}>{task.title}</TaskTitle>
      </TaskContent>

      <ActionButton onPress={() => onDelete(task.id)}>
        <Ionicons name="trash-outline" size={20} color="#EF4444" />
      </ActionButton>
    </TaskContainer>
  );
}

