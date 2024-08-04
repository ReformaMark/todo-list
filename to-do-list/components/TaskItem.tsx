import React, { useState } from 'react';
import {  StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { TodoItem } from '@/lib/types';
import Button from './Button';
import { Colors } from '@/constants/Colors';
import ToggleSwitch from './ToggleSwitch';
import { updateTodoList } from '@/lib/AsyncStorage';
import useTodoList from '@/lib/hooks/useTodoList';
import { Swipeable } from 'react-native-gesture-handler';
import { MAX_CHARACTER } from '@/constants/Constant';


interface TaskItemProps {
    item: TodoItem;
    onPress: (item: TodoItem) => void;
    onEdit: (task: TodoItem, newTask: string) => void;
}

const TaskItem = ({ item, onPress, onEdit }: TaskItemProps) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [newTask, setNewTask] = useState<string>(item.task);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedTask, setSelectedTask] = useState<TodoItem | undefined>();
    const list = useTodoList()

    const handleModal = (task?: TodoItem) => {
        setSelectedTask(task || undefined);
        setIsOpen(!isOpen);
    };
    const handleSave = () => {
        if(newTask === '' || newTask.length >= MAX_CHARACTER) {
            onEdit(item, item.task)
        } else {
            onEdit(item, newTask);
        }
        setIsEditing(false);
    };
    const handleDelete = async (task: TodoItem) =>{
        const alltask = list.todoList;
        const updatedList = alltask.filter(item => item.task !== task.task);

        await updateTodoList(updatedList)
        list.setTodoList(updatedList);
    }


    const renderLeftActions = () => (
        <Button icon={'delete'} label='' onPress={()=>handleModal(item)} color={Colors.light.text}/>
       );
 

    return (
        <>
            <Swipeable
                renderRightActions={renderLeftActions}
            >
                <TouchableOpacity
                    onPress={() => setIsEditing(true)}
                    style={[
                        styles.taskContainer,
                        { backgroundColor: item.isDone ? Colors.light.secondary : Colors.light.background },
                    ]}
                >
                    <ToggleSwitch task={item} />
                    {isEditing ? (
                        <TextInput
                            autoFocus
                            value={newTask}
                            onChangeText={setNewTask}
                            onSubmitEditing={handleSave}
                            style={[styles.item, { color: item.isDone ? Colors.light.background : Colors.light.text }]}
                        />
                        ) : (
                        <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={[styles.item, { color: item.isDone ? Colors.light.background : Colors.light.text }]}
                        >
                            {item.task}
                        </Text>
                    )}
                
                    <View>
                        {item.isDone && (
                            <Button icon="done" onPress={() => {}} color={Colors.light.background} />
                        )}
                    </View>
                </TouchableOpacity>
            </Swipeable>
            <Modal
                isVisible={isOpen}
                hideModalContentWhileAnimating={true}
                useNativeDriver={true}
                animationOutTiming={400}
                animationIn={'fadeInDown'}
                animationOut={'fadeOutUp'}
                backdropOpacity={0.3}
                onBackButtonPress={handleModal}
                onBackdropPress={handleModal}
            >
                 <View style={styles.modalContainer}>
                    <Text style={styles.title}>Are you sure you want to delete this task?</Text>
                    {selectedTask ? (
                        <>
                            <Text style={styles.taskTitle}>Task: {selectedTask.task}</Text>
                            <Text style={styles.taskStatus}>Status: {selectedTask.isDone ? 'Done' : 'Pending'}</Text>
                        </>
                    ) : (
                        <Text style={styles.noTask}>No task selected</Text>
                    )}
                    <View style={styles.btnContainer}>
                        <Button label='Cancel' color={Colors.light.text} onPress={()=> setIsOpen(false)} />
                        <Button label='Delete' color={Colors.light.text} onPress={() => handleDelete(item)} />
                        
                    </View>
                </View>
            </Modal>
        </>
    )
};

const styles = StyleSheet.create({
    taskContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.light.background,
        padding: 10,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        borderRadius: 20,
        borderColor: '#dddddd',
        borderWidth: 2,
    },
    item: {
        color: Colors.light.text,
        maxWidth: '90%',
    },
    modalContainer: {
        minHeight: 100,
        padding: 20,
        backgroundColor: Colors.light.background,
    },
    title: {
        fontSize: 13,
        fontWeight: '600',
        marginBottom:10,
    },
    taskTitle: {
        fontSize: 12,
        color: Colors.light.text,
    },
    taskStatus: {
        fontSize: 12,
        color: Colors.light.text,
    },
    noTask: {
        fontSize: 16,
        color: Colors.light.text,
        fontStyle: 'italic',
    },
    btnContainer: {
        alignSelf: 'flex-end',
        flexDirection: 'row',
        gap: 20,
        marginLeft: 'auto',
        padding: 10,
        marginTop: 10,
    },
});

export default TaskItem;
