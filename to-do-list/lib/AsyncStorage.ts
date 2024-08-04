import AsyncStorage from "@react-native-async-storage/async-storage";
import { TodoItem } from "./types";
import useTodoList from "./hooks/useTodoList";
//Get all all task in local storage
export const loadToDoList = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@to_do_list');
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      // error reading value
      console.error('Failed to load to-do list:', e);
      return [];
    }
};

//Add new task to the list
export const saveToDoList = async (toDoList: TodoItem[]) => {
    try {
        const jsonValue = JSON.stringify(toDoList);
        await AsyncStorage.setItem('@to_do_list', jsonValue);
    } catch (e) {
        // saving error
        console.error('Failed to save to-do list:', e);
    }
};

//Delete all task
export const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('@to_do_list')
    } catch(e) {
      // remove error
    console.log('Failed to remove all to-do list:', e)

    }
  
    console.log('Done.')
  }

  