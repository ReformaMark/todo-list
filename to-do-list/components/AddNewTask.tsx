import {  StyleSheet, TextInput, View, Text} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '@/constants/Colors';
import CustomModal from './CustomModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from './Button';
import { TodoItem } from '@/lib/types';
import useTodoList from '@/lib/hooks/useTodoList';
import { loadToDoList, saveToDoList } from '@/lib/AsyncStorage';
import useModal from '@/lib/hooks/useModal';
import { MAX_CHARACTER } from '@/constants/Constant';

const AddNewTask = () => {
  const modal =useModal()
  const [newTask, setNewTask] = useState<TodoItem>({
    task: '',
    isDone: false
  })
  const [error, setError]= useState<string>('')
  const list = useTodoList()

  const addTask = async () => {
    const isExisting = list.todoList.some(task => task.task === newTask.task)

    if(isExisting){
      setError("The task is already in the list. Please enter a unique task.")
      return
    }

    if(newTask.task === ""){
      setError("Invalid task.")
      return
    }

    if(newTask.task.length >= MAX_CHARACTER){
      setError("The task is invalid as it exceeds the maximum allowed length of 100 characters.")
      return
    }

    if(newTask){
      setError('')
      const updatedList = [...list.todoList, newTask];
      list.setTodoList(updatedList);
      await saveToDoList(updatedList);
      
      setNewTask({
        task:"",
        isDone: false
      });
      modal.onClose()
    } 
  };

  return (
      <CustomModal 
        backgroundColor={Colors.light.primary} 
        icon={'add-task'} label={"Add new task"} 
        title='Add new task'
       
      >
        <TextInput 
          autoFocus
          value={newTask.task}       
          onChangeText={(text) => setNewTask({
            task: text,
            isDone: false
          })}
          placeholder="Type your to do here ..."
          style={styles.input}
        />
        {error && (
          <Text style={{color: Colors.light.destructive, fontWeight:'300', fontSize: 10}}>{error}</Text>
        )}
        <View style={styles.btnContainer}>
          <Button color={Colors.light.text} label={'Add'} onPress={addTask}/>
        </View>
      </CustomModal>
  )
}

const styles = StyleSheet.create({
  container:{
   

  },
  title:{
    fontSize: 15,
    fontWeight: "600",
  },
  btnContainer:{
    flexDirection: "row",
    gap: 20,
    marginLeft: "auto",
  },
  input:{
      backgroundColor: Colors.light.background,
      marginVertical: 20,
      color: Colors.light.text
  }
})

export default AddNewTask