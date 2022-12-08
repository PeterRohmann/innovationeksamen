import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, {useEffect, useState} from 'react';

import { Card } from 'react-native-paper';
import firebase from "firebase/compat";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import "firebase/database";
import "firebase/firestore";
import { doc } from 'firebase/firestore';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { useIsFocused } from '@react-navigation/native';
import Add_edit_Ingredients from './components/Add_edit_Ingredients';
import IngredientDetails from './components/IngredientDetails';
import IngredientList from './components/IngredientList';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import Ionicons from "react-native-vector-icons/Ionicons";
import BarCodeComponent from './components/BarCodeScanner';
import SwipeUI from './components/SwipeUI';
import GetRecipes from './components/Algorithm';








const firebaseConfig = {
  apiKey: "AIzaSyBBTmq8hPwKNVqmLl4fxI7u1XkdDf7k8pk",
  authDomain: "teslabmw-a7c40.firebaseapp.com",
  databaseURL: "https://teslabmw-a7c40-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "teslabmw-a7c40",
  storageBucket: "teslabmw-a7c40.appspot.com",
  messagingSenderId: "140930604459",
  appId: "1:140930604459:web:652123c5abfce2ac65c6ee"
};


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  }

  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();



  const StackNavigation = () => {
      return (
        
          <Stack.Navigator
              initialRouteName="Details"
          >
              <Stack.Screen name="Ingredient List" component={IngredientList}
                            options={{
                                headerTitleAlign: 'center',
                                headerTitleStyle: {color: 'white'},
                                headerStyle: {backgroundColor: '#ba6262'}}
                            }
              />
            
              <Stack.Screen name="Edit Ingredient" component={Add_edit_Ingredients} options={{
                  headerTitleStyle: { textAlign: 'right', color: 'white' },
                  headerStyle: {backgroundColor: '#62bab5'}
              }} />
              <Stack.Screen name="Ingredient Details" component={IngredientDetails} options={{
                  headerTitleStyle: {color: 'black'},
                  headerStyle: {backgroundColor: '#628bba'}
              }}
              />
              
              <Stack.Screen name="Barcode Scanner" component={BarCodeComponent} options={{
                  headerTitleStyle: {color: 'black'},
                  headerStyle: {backgroundColor: '#628bba'}
              }}
              />
          </Stack.Navigator>
          
      )
  }

  const StackNavigation2 = () => {
    const isFocused = useIsFocused();
    return (
      
        <Stack.Navigator
            initialRouteName="Details"
        >
            
            <Stack.Screen name="Recipe List" component={RecipeList}
                          options={{
                              headerTitleAlign: 'center',
                              headerTitleStyle: {color: 'white'},
                              headerStyle: {backgroundColor: '#ba6262'}}
                          }
            />
           
           
             <Stack.Screen name="Recipe Details" component={RecipeDetails} options={{
                headerTitleStyle: {color: 'black'},
                headerStyle: {backgroundColor: '#628bba'}
            }}
            />
            
        </Stack.Navigator>
        
    )
}

export default function App() {
  return (
    <NavigationContainer>
    <Tab.Navigator>
    <Tab.Screen name={'Home'} component={StackNavigation} options={{tabBarIcon: () => ( <Ionicons name="home" size={20} />),headerShown:null}}/>
      <Tab.Screen name={'Add Ingredients'} component={Add_edit_Ingredients} options={{tabBarIcon: () => ( <Ionicons name="add" size={20} />)}}/> 
      <Tab.Screen  name={'Recipe List'} component={StackNavigation2} options={{tabBarIcon: () => ( <Ionicons name="fast-food-outline" size={20} />),headerShown:null } }/>    
      <Tab.Screen  name={'Swipe'} component={SwipeUI} onClick={GetRecipes()} options={{tabBarIcon: () => ( <Ionicons name="fast-food-outline" size={20} />) } }/> 
      </Tab.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
