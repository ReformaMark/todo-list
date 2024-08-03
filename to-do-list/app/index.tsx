import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TaskList from '@/components/TaskList'
import TaskInput from '@/components/TaskInput'
import CustomModal from '@/components/CustomModal'
import { Colors } from '@/constants/Colors'

const TodoScreen = () => {
 
  return (
    <View >
      <View style={styles.pageButtons}>
        <CustomModal 
          backgroundColor={Colors.light.primary}
          icon={'add-task'}
          label={'Add new task'}
          title='Add new task' 
          confirmLabel='Add' 
          cancelLabel='Cancel'
        >
        </CustomModal>
      </View>
      <View style={styles.pageButtons}>
        <CustomModal 
         backgroundColor={Colors.light.destructive}
          icon={'delete'}
          label={'Delete all task'}
          title='Are you sure you want to remove all the remaining task(s)?' 
          confirmLabel='Yes' 
          cancelLabel='No'
        >
        </CustomModal>
        <CustomModal 
          backgroundColor={Colors.light.secondary}
          icon={'done-all'}
          label={'Mark all task as Done'}
          title='Are you sure you want to remove all task?' 
          confirmLabel='Yes' 
          cancelLabel='No'
        >
        </CustomModal>        
      </View>
      <View>
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

