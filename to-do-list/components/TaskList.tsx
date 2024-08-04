import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { Colors } from '@/constants/Colors'
import Button from './Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TodoItem } from '@/lib/types';
import useTodoList from '@/lib/hooks/useTodoList';
import { loadToDoList } from '@/lib/AsyncStorage';

const TaskList = () => {
    const list = useTodoList()
    const renderItem = ({ item  }: {item:TodoItem}) => (
        <View style={[styles.taskContainer, {backgroundColor: item.isDone === true ? Colors.light.secondary : Colors.light.background}]}>
            <Text 
                numberOfLines={1} 
                ellipsizeMode="tail" 
                style={[styles.item, {color: item.isDone === true ?  Colors.light.background : Colors.light.text}]}
            >
                {item.task}
            </Text>
            <View style={styles.btnContainer}>
                {item.isDone ? (
                    <Button icon="done" onPress={()=> {}} color={Colors.light.background} />
                ):(
                    <Button icon="edit" onPress={()=> {}} color="black" />
                )}
                
            </View>
        </View>
      );
      
  return (
    <View style={styles.container}>
        <Text style={styles.listTitle}>To-Do Items</Text>
        
        <FlatList 
            data={list.todoList}
            renderItem={renderItem}
            keyExtractor={(item) => item.task}
            numColumns={1}
            contentContainerStyle={{gap: 10}}
            scrollEnabled
        />
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        height: "80%",
        paddingVertical: 20,
        paddingHorizontal: 10,
        
    },
    taskContainer:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        backgroundColor: Colors.light.background,
        padding: 10,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
     
        borderRadius: 20, 
        borderColor: "#dddddd",
        borderWidth:2,
    },
    btnContainer:{
       
    },
    item:{
        color: Colors.light.text,
        maxWidth: "90%",
    },
    listTitle:{
        margin: 'auto',
        color: Colors.light.textLight,
        marginBottom: 10,
      }
  
})

export default TaskList

