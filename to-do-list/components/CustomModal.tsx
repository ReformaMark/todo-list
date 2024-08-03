import {  StyleSheet, Text, TextInput, View } from 'react-native'
import React, { ReactNode, useState } from 'react'
import Modal from "react-native-modal";
import Button from './Button';
import { Colors } from '@/constants/Colors';

interface CustomModalProps {
    children?: ReactNode | undefined,
    title: string,
    confirmLabel: string,
    cancelLabel: string,
    icon: any,
    label: string,
    backgroundColor?: string
}

const CustomModal = ({children, title, confirmLabel, cancelLabel, icon, label, backgroundColor}:CustomModalProps) => {
    const [task, setTask] = useState<string>('')
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const handleModal = () => {
      setModalVisible(!modalVisible);
    };

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <View style={{padding:10,}}>
        <Button  icon={icon} label={label} onPress={handleModal} color='white'/>
      </View>
      <Modal 
        isVisible={modalVisible}
        hideModalContentWhileAnimating={true}
        useNativeDriver={true}
        animationOutTiming={1000}
        hasBackdrop
        onBackdropPress={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
            <Text style={styles.title}>{title}</Text>
            {children}
            <View style={styles.btnContainer}>
                <Button color={Colors.light.text} label={cancelLabel} onPress={handleModal}/>
                <Button color={Colors.light.text} label={confirmLabel} onPress={()=> {setModalVisible(false)}}/>
            </View>
        </View>
      </Modal>
    </View>
   
  
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: Colors.light.primary,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
   
  },
  modalContainer:{

    padding: 20,
    backgroundColor: Colors.light.background,
  },
  btnContainer:{
    flexDirection: "row",
    gap: 20,
    marginLeft: "auto",
  },
  title:{
    fontSize: 15,
    fontWeight: "600",
  },
  input:{
      backgroundColor: Colors.light.background,
      marginVertical: 20,
      color: Colors.light.text
  }
})

export default CustomModal