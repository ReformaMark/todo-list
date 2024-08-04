import {  StyleSheet, Text, TextInput, View } from 'react-native'
import React, { ReactNode, useEffect, useState } from 'react'
import Modal from "react-native-modal";
import Button from './Button';
import { Colors } from '@/constants/Colors';
import useModal from '@/lib/hooks/useModal';

interface CustomModalProps {
    children?: ReactNode | undefined,
    title: string,
    icon: any,
    label: string,
    backgroundColor?: string,
}

const CustomModal = ({
  children, 
  title, 
  icon, 
  label, 
  backgroundColor,

}:CustomModalProps) => {
  const [modalVisibile, setModalVisible] = useState<boolean>(false)
  const modal = useModal()

  useEffect(()=>{
    closeModal()
  },[modal])

  const openModal = () =>{
    setModalVisible(!modalVisibile)
  }
  const closeModal = () =>{
    setModalVisible(false)
  }
  return (
    <View style={[styles.container, {backgroundColor}]}>
      <View style={{padding:10,}}>
        <Button icon={icon} label={label} onPress={openModal} color='white'/>
      </View>
      <Modal 
        isVisible={modalVisibile}
        hideModalContentWhileAnimating={true}
        useNativeDriver={true}
        animationOutTiming={400}
        animationIn={"fadeInDown"}
        animationOut={"fadeOutUp"}
        backdropOpacity={0.3}
        onBackButtonPress={closeModal}
        onBackdropPress={closeModal}
      
      >
        <View style={styles.modalContainer}>
            <Text style={styles.title}>{title}</Text>
            {children}
        </View>
      </Modal>
    </View>
   
  
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'space-between',
    backgroundColor: Colors.light.primary,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    borderRadius: 10,
  },
  modalContainer:{
    minHeight: 100,
    padding: 20,
    backgroundColor: Colors.light.background,
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