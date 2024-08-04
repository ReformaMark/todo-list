import { StyleSheet, Switch, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import useTodoList from '@/lib/hooks/useTodoList';
import { TodoItem } from '@/lib/types';
import { updateTodoList } from '@/lib/AsyncStorage';
import { Colors } from '@/constants/Colors';

interface ToggleSwitchProps {
    task: TodoItem
}

const ToggleSwitch = ({task}:ToggleSwitchProps) => {
    const list = useTodoList();
    const [isEnabled, setIsEnabled] = useState<boolean>(false);
    const [isDisabled, setIsDisabled] = useState<boolean>(false);

    useEffect(()=>{
        if(task.isDone){
            setIsEnabled(true)
        } else {
            setIsEnabled(false)
        }
    },[list.todoList])

    const toggleSwitch = () => {

        setIsDisabled(true)
        try {
            setIsEnabled(!isEnabled)
            markAsDone(task)
        } catch (error) {
            
        } finally {
            setIsDisabled(false)
        }
    }

    const markAsDone = async (task?: TodoItem) =>{
        const alltask = list.todoList

        if (!task) return;
       
        if(!task.isDone) {
            const updatedList = alltask.map(item =>
                item.task === task.task
                    ? { ...item, isDone: true } 
                    : item
            );
            updateTodoList(updatedList)
            list.setTodoList(updatedList);
        }

        if(task.isDone) {
            const updatedList = alltask.map(item =>
                item.task === task.task
                    ? { ...item, isDone: false } 
                    : item
            );
            updateTodoList(updatedList)
            list.setTodoList(updatedList);
        }
        
    }
    
  return (
    <View style={styles.container}>
       <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            disabled={isDisabled}
        />
        {isEnabled ? (
            <Text style={[styles.text, {color: isEnabled ? Colors.light.background: Colors.light.text}]}>Done</Text>
        ):(
            <Text style={styles.text}>Pending</Text>
        )}
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent:'center',
    },
    text:{
        fontSize:10
    }
})

export default ToggleSwitch

