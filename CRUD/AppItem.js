import React from 'react';
import { FontAwesome } from '@expo/vector-icons'; 
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';

import Database from './Database';

  export default function AppItem(props){
    return (
        <View style={styles.container}>
          <Text style={styles.textItem}>{props.item}</Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity 
            style={styles.deleteButton} 
            onPress={handleDeletePress}>
            <FontAwesome name="trash" size={24} color="black" />
            </TouchableOpacity> 
            <TouchableOpacity 
            style={styles.editButton}
            onPress={handleEditPress}> 
            <FontAwesome name="edit" size={24} color="black" /> 
            </TouchableOpacity> 
          </View>
        </View>
      );
    
      function handleDeletePress(){ 
        Alert.alert(
            "Atenção",
            "Você tem certeza que deseja excluir este item?",
            [
                {
                text: "Não",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
                },
                { text: "Sim", onPress: () => {
                  Database.deleteItem(props.id)
                  .then(response => props.navigation.navigate("AppList", {id: props.id}));
                }
              }
            ],
            { cancelable: false }
            );
      }
      async function handleEditPress(){ 
        const item = await Database.getItem(props.id);
        props.navigation.navigate("AppForm", item);
      }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      marginTop: 20,
      width: '100%'
    },
    buttonsContainer: {
        flexDirection: 'row-reverse',
        alignItems: 'flex-end',
        borderBottomWidth: 1,
        borderBottomColor: '#CCC',
        paddingBottom: 10,
        marginTop: 10,
    },
    editButton: {
        marginLeft: 10,
        height: 40,
        backgroundColor: '#4169E1',
        borderRadius: 10,
        padding: 10,
        fontSize: 12,
        elevation: 10,
        shadowOpacity: 10,
        shadowColor: '#ccc',
        alignItems: 'center'
    },
    deleteButton: {
        marginLeft: 10,
        height: 40,
        width: 40,
        backgroundColor: 'red',
        borderRadius: 10,
        padding: 10,
        fontSize: 12,
        elevation: 10,
        shadowOpacity: 10,
        shadowColor: '#ccc',
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    textItem: {
        fontSize: 20,
    }
  });