import { Pressable, StyleSheet, Text } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from '@/constants/Colors';

interface ButtonProps {
    icon?: any ,
    label?: string,
    onPress: () => void,
    color?: string,
}

export default function Button({ icon, label, onPress, color="#fff" }: ButtonProps) {
  return (
    <Pressable style={styles.iconButton} onPress={onPress}>
        {icon !== undefined &&  (
            <MaterialIcons name={icon} size={24} color={color} />
        )}
        
        {label !== undefined && (
            <Text style={{color}}>{label}</Text>
        )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
    iconButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconButtonLabel: {
        color: Colors.light.text,
        
    },
  });