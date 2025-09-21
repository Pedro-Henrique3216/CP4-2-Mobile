import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export interface TaskProps {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  onToggleCompleted?: (completed: boolean) => void; // função para alternar o status
  onDelete?: () => void; // função para deletar a tarefa
}

const Task = ({
  title,
  description,
  dueDate,
  completed,
  createdAt,
  updatedAt,
  onToggleCompleted,
  onDelete,
}: TaskProps) => {
  const { colors } = useTheme();

  const formatDate = (date: Date) => date.toLocaleDateString();
  const formatDateTime = (date: Date) => date.toLocaleString();
  const formatTime = (date: Date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <View style={[styles.taskContainer, { backgroundColor: colors.cardBackground, shadowColor: colors.shadow }]}>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      <Text style={[styles.text, { color: colors.text }]}>Descrição: {description}</Text>
      <Text style={[styles.text, { color: colors.text }]}>
        Vencimento: {formatDate(dueDate)} às {formatTime(dueDate)}
      </Text>
      <Text style={[styles.text, { color: completed ? colors.success : colors.warning }]}>
        Status: {completed ? "Concluído" : "Pendente"}
      </Text>
      <Text style={[styles.text, { color: colors.secondary }]}>Criado em: {formatDateTime(createdAt)}</Text>
      <Text style={[styles.text, { color: colors.secondary }]}>Última atualização: {formatDateTime(updatedAt)}</Text>

      {/* Botões para alternar status e deletar */}
      <View style={styles.buttonsRow}>
        {onToggleCompleted && (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: completed ? colors.warning : colors.success }]}
            onPress={() => onToggleCompleted(!completed)}
          >
            <Text style={styles.buttonText}>{completed ? "Desmarcar" : "Concluir"}</Text>
          </TouchableOpacity>
        )}
        {onDelete && (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.danger }]}
            onPress={onDelete}
          >
            <Text style={styles.buttonText}>Deletar</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    marginVertical: 8,
    padding: 15,
    borderRadius: 12,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  text: {
    fontSize: 14,
    marginTop: 3,
  },
  buttonsRow: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default Task;
