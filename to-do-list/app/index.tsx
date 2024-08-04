import {  StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import TaskList from '@/components/TaskList'
import TaskInput from '@/components/AddNewTask'
import CustomModal from '@/components/CustomModal'
import { Colors } from '@/constants/Colors'
import { loadToDoList } from '@/lib/AsyncStorage'
import useTodoList from '@/lib/hooks/useTodoList'
import AsyncStorage from '@react-native-async-storage/async-storage'
import DeleteAllTask from '@/components/DeleteAllTask'
import AddNewTask from '@/components/AddNewTask'
import MarkAllDone from '@/components/MarkAllDone'

const TodoScreen = () => {
  const list = useTodoList()

  useEffect(() => {
    const loadTasks = async () => {
      const savedTasks = await loadToDoList();
      list.setTodoList(savedTasks);
    };
    loadTasks();
  }, [list.todoList]);

  return (
    <View >
      <View style={styles.pageButton}>
        <AddNewTask/>            
      </View>
      <View style={styles.pageButtons}>
       <DeleteAllTask/>
       <MarkAllDone/>      
      </View>
      <View >
        <TaskList/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  pageButton:{
    padding: 10,
    flexDirection: "row",
    columnGap: 10,
  },
  pageButtons:{
    padding: 10,
    flexDirection: "row",
    columnGap: 10,
  
  },
 
})

export default TodoScreen

