import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomModal from './CustomModal'
import { Colors } from '@/constants/Colors'
import Button from './Button'
import useModal from '@/lib/hooks/useModal'
import useTodoList from '@/lib/hooks/useTodoList'
import { updateTodoList } from '@/lib/AsyncStorage'

const MarkAllDone = () => {
    const modal = useModal()
    const list = useTodoList()
    const closeModal = ()=>{
        modal.onClose()
    }
    const markAllAsDone = async()=>{
        try {
            const allTasks = list.todoList
            const updatedTasks = allTasks.map((task)=>({
                ...task,
                isDone: true
            }))
            await updateTodoList(updatedTasks)
            list.setTodoList(updatedTasks)
            console.log("All task mark as done.")
        } catch (error) {
            console.log("Failed to update task", error)
        }
    }   

   const notAllDone = ()=>{
    return list.todoList.some(task => task.isDone === false)
   }
 
  return (
    <CustomModal 
        backgroundColor={Colors.light.secondary}
        icon={'done-all'}
        label={'Mark all task as Done'}
        title={notAllDone() ? 'Mark all task as Done?' : 'All task are already done.'}
        
    >
        <View style={styles.btnContainer}>
            {notAllDone() ? (
                <>
                    <Button color={Colors.light.text} label={'No'} onPress={closeModal}/>
                    <Button color={Colors.light.text} label={'Yes'} onPress={markAllAsDone}/>
                </>
            ):(
                <Button color={Colors.light.text} label={'Okay'} onPress={closeModal}/>
            )}
            
        </View>
    </CustomModal>  
  )
}

const styles = StyleSheet.create({
    btnContainer:{
        alignSelf:'flex-end',
        flexDirection: "row",
        gap: 20,
        marginLeft: "auto",
        padding:10,
        marginTop: 10,
    },
})

export default MarkAllDone

