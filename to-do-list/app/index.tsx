import {  StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import TaskList from '@/components/TaskList'
import TaskInput from '@/components/AddNewTask'
import CustomModal from '@/components/CustomModal'
import { Colors } from '@/constants/Colors'
import { loadToDoList } from '@/lib/AsyncStorage'
import useTodoList from '@/lib/hooks/useTodoList'
import AsyncStorage from '@react-native-async-storage/async-storage'

const TodoScreen = () => {
  const list = useTodoList()

  useEffect(() => {
    const loadTasks = async () => {
      const savedTasks = await loadToDoList();
      list.setTodoList(savedTasks);
    };
    loadTasks();
    // const removeValue = async () => {
    //   try {
    //     await AsyncStorage.removeItem('@to_do_list')
    //   } catch(e) {
    //     // remove error
    //   }
    
    //   console.log('Done.')
    // }
    // removeValue()
  }, []);
  return (
    <View >
      <View style={styles.pageButtons}>
        <TaskInput/>            
      </View>
      <View style={styles.pageButtons}>
        <CustomModal 
         backgroundColor={Colors.light.destructive}
          icon={'delete'}
          label={'Delete all task'}
          title='Are you sure you want to remove all the remaining task(s)?' 
          
         
        >

        </CustomModal>
        <CustomModal 
          backgroundColor={Colors.light.secondary}
          icon={'done-all'}
          label={'Mark all task as Done'}
          title='Are you sure you want to remove all task?' 
          
        >

        </CustomModal>        
      </View>
      <View >
        <TaskList/>
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({

  pageButtons:{
    padding: 10,
    flexDirection: "row",
    columnGap: 10,
  
  },
 
})

export default TodoScreen

