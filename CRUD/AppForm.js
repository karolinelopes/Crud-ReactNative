import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Database from './Database';

export default function AppForm({ route, navigation}) {
const id = route.params ? route.params.id : undefined;
const [descricao, setDescricao] = useState(''); 
const [quantidade, setQuantidade] = useState('');

function handleDescriptionChange(descricao){ setDescricao(descricao); } 
function handleQuantityChange(quantidade){ setQuantidade(quantidade); }
function handleButtonPress(){ 
  console.log({id: new Date().getTime(), descricao, quantidade}); 
  navigation.navigate("AppList");
}

useEffect(() => {
  if(!route.params) return;
  setDescricao(route.params.descricao);
  setQuantidade(route.params.quantidade.toString());
}, [route])

async function saveItem(listItem, id){
  listItem.id = id ? id : new Date().getTime()
  const savedItems = await getItems();

  if(id){
      const index = await savedItems.findIndex(item => item.id === id);
      savedItems[index] = listItem;
  }
  else
    savedItems.push(listItem);

  return AsyncStorage.setItem('items', JSON.stringify(savedItems));
}

async function handleButtonPress(){ 
  const listItem = {descricao, quantidade: parseInt(quantidade)};
  Database.saveItem(listItem, id)
    .then(response => navigation.navigate("AppList", listItem));
    
    if(response) savedItems = JSON.parse(response);
    savedItems.push(listItem);
  
    await AsyncStorage.setItem('items', JSON.stringify(savedItems));
    navigation.navigate("AppList", listItem);
}

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Item para comprar</Text>
      <View style={styles.inputContainer}> 
      <TextInput 
        style={styles.input} 
        onChangeText={handleDescriptionChange} 
        placeholder="O que está faltando em casa?"
        clearButtonMode="always" 
        value={descricao}/> 
        <TextInput 
        style={styles.input} 
        onChangeText={handleQuantityChange} 
        placeholder="Digite a quantidade" 
        keyboardType={'numeric'}
        clearButtonMode="always" 
        value={quantidade.toString()}/>  
        <TouchableOpacity style={styles.button} onPress={handleButtonPress}> 
        <View style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Salvar</Text> 
        </View> 
        </TouchableOpacity> 
        <TouchableOpacity style={styles.editButton}> 
        <Text style={styles.buttonText}>Editar</Text> 
        </TouchableOpacity>
      </View>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#B0C4DE',
      alignItems: 'center',
    },
    title: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 50,
    },
    inputContainer: {
      flex: 1,
      marginTop: 30,
      width: '90%',
      padding: 20,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      alignItems: 'stretch',
      backgroundColor: '#fff'
    },
    input: {
      marginTop: 10,
      height: 60,
      backgroundColor: '#fff',
      borderRadius: 10,
      paddingHorizontal: 24,
      fontSize: 16,
      alignItems: 'stretch'
    },
    button: {
      marginTop: 10,
      height: 60,
      backgroundColor: '#4169E1',
      borderRadius: 10,
      paddingHorizontal: 24,
      fontSize: 16,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 20,
      shadowOpacity: 20,
      shadowColor: '#ccc',
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
    }
  });