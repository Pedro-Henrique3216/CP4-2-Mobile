import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export interface TaskProps {
    title: string;
    description: string;
    dueDate: Date;
    completed: boolean;
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

const Task = ({ title, description, dueDate, completed, createdAt, updatedAt }: TaskProps) => {
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
});

export default Task;
