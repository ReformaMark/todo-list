import {  StyleSheet, TextInput, View, Text} from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/constants/Colors';
import CustomModal from './CustomModal';
import Button from './Button';
import { TodoItem } from '@/lib/types';
import useTodoList from '@/lib/hooks/useTodoList';
import { saveToDoList } from '@/lib/AsyncStorage';
import useModal from '@/lib/hooks/useModal';
import { MAX_CHARACTER } from '@/constants/Constant';
import { useToast } from 'react-native-toast-notifications';

const AddNewTask = () => {
  const modal =useModal()
  const [newTask, setNewTask] = useState<TodoItem>({
    task: '',
    isDone: false
  })
  const [isDisabled, setIsDisabled] = useState<boolean>(false)
  const [error, setError]= useState<string>('')
  const list = useTodoList()
  const toast = useToast()

  const addTask = async () => {
    setIsDisabled(true)
    const isExisting = list.todoList.some(task => task.task === newTask.task)

    if(isExisting){
      setError("The task is already in the list. Please enter a unique task.")
      setIsDisabled(false)
      return
    }

    if(newTask.task === ""){
      setError("Invalid task.")
      setIsDisabled(false)
      return
    }

    if(newTask.task.length >= MAX_CHARACTER){
      setError("The task is invalid as it exceeds the maximum allowed length of 100 characters.")
      setIsDisabled(false)
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
      setIsDisabled(false)
    } 

    toast.show("Task added successfully", {
      type: "success",
      placement: "bottom",
      duration: 1000,
      animationType: "slide-in",
  })
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
          <Button disable={isDisabled} color={Colors.light.text} label={'Add'} onPress={addTask}/>
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