import * as React from 'react';
import { View, ScrollView, Text, Platform, FlatList, StyleSheet, Button, Alert, ImageBackground, Image } from 'react-native';
import firebase from 'firebase/compat';
import {useEffect, useState} from "react";

let array = []
const Instructions = ({route}) => {
    const [recipe,setrecipe] = useState();
console.log(route.params)
    useEffect(() => {
        // Henter recipe values fra databasen
        if(!recipe){
            firebase
                .database()
                // specificerer id
                .ref(`/Recipes/${route.params}`)
                // -remove fjerner data
                .on('value', snapshot => {
                    setrecipe(snapshot.val())
                });  
} 
    }, []);

 
     //   console.log(recipe.instructions)
    // array = recipe.instructions

if(recipe){
    console.log(recipe)
    recipe.instructions.shift()
    array = recipe.instructions
    
}
console.log(array)



// hvis der ikke er data i databasen. det burde der være når man er på Details-skærmen
    if (!recipe) {
        return <Text>No data</Text>;
    }

    // Nu kommer det brugeren rent faktisk kan se
    // to knapper, der kører de før specificerede funktioner
    // herefter vises både keys og values
    return (
        <ImageBackground source={require("../assets/opacity.png")}  style={styles.image} >
        <ScrollView style={styles.container}>
        
        {
                array.map((item,index)=>{
                    return(
                        <View style={styles.row} key={index}>
                           
                            <Text style={styles.value}>{item}</Text>
                        </View>
                    )
                })
            }
            
        </ScrollView>
        </ImageBackground>
       
    );

    
}

export default Instructions;

const styles = StyleSheet.create({
    container: { flex: 1},
    row: {
        margin: 5,
        padding: 5,
        flexDirection: 'row',
    },
    label: { width: 100, fontWeight: 'bold' },
    value: { flex: 1, color: 'black', fontSize: 15, textTransform: "capitalize"},
    image: {
        opacity: 1,
        height: "100%",
        width: "100%"
     }
});