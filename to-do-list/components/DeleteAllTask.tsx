import { View, StyleSheet } from 'react-native'
import React from 'react'
import CustomModal from './CustomModal'
import { Colors } from '@/constants/Colors'
import Button from './Button'
import { removeValue } from '@/lib/AsyncStorage'
import useModal from '@/lib/hooks/useModal'
import useTodoList from '@/lib/hooks/useTodoList'

const DeleteAllTask = () => {
    const modal = useModal()
    const list = useTodoList()
    const closeModal = ()=>{
        modal.onClose()
    }
    
  return (
    <View>
    <CustomModal 
        backgroundColor={Colors.light.destructive}
        icon={'delete'}
        label={'Delete all task'}
        title={list.todoList.length < 1 ? 'There is no available task to delete.'  : 'Are you sure you want to remove all the remaining task(s)?'} 
   >
    <View style={styles.btnContainer}>
        <Button color={Colors.light.text} label={list.todoList.length < 1 ? 'Okay':'No'} onPress={closeModal}/>
        {list.todoList.length >= 1 && (
            <Button color={Colors.light.text} label={'Yes'} onPress={removeValue}/>
        )}
       
    </View>
   </CustomModal>
   </View>
  )
}

const styles = StyleSheet.create({
    btnContainer:{
        marginTop: 10,
        flexDirection: "row",
        gap: 20,
        marginLeft: "auto",
    },
})
export default DeleteAllTask