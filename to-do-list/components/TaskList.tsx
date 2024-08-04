import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FlatList, Swipeable } from 'react-native-gesture-handler';
import { Colors } from '@/constants/Colors';
import Button from './Button';
import { TodoItem } from '@/lib/types';
import useTodoList from '@/lib/hooks/useTodoList';
import Modal from 'react-native-modal';
import { loadToDoList, updateTodoList } from '@/lib/AsyncStorage';
import TaskItem from './TaskItem'; // Import the new TaskItem component

const TaskList = () => {
    const list = useTodoList();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedTask, setSelectedTask] = useState<TodoItem | undefined>();

    useEffect(() => {
        const loadTasks = async () => {
            const savedTasks = await loadToDoList();
            list.setTodoList(savedTasks);
        };
        loadTasks();
    }, [list.todoList]);

    const handleModal = (task?: TodoItem) => {
        setSelectedTask(task || undefined);
        setIsOpen(!isOpen);
    };

    const handleEdit = async (task: TodoItem, newTask: string) => {
        const alltask = list.todoList;
        const updatedList = alltask.map(item =>
            item.task === task.task
                ? { ...item, task: newTask }
                : item
        );
        await updateTodoList(updatedList);
        list.setTodoList(updatedList);
    };

    const renderItem = ({ item }: { item: TodoItem }) => (
        <TaskItem item={item} onPress={handleModal} onEdit={handleEdit} />
    );

    return (
        <View style={styles.container}>
            <View style={{flexDirection:"row"}}>
                <Text style={styles.listTitle}>To-Do Items</Text>
                <Text style={styles.listTitle}>No of task(s): {list.todoList.length}</Text>
            </View>
           
            <FlatList
                data={list.todoList}
                renderItem={renderItem}
                keyExtractor={(item) => item.task}
                numColumns={1}
                contentContainerStyle={{ gap: 10 }}
                scrollEnabled
            />
           
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '80%',
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    listTitle: {
        margin: 'auto',
        color: Colors.light.textLight,
        marginBottom: 10,
        fontSize:12,
    },
});

export default TaskList;
