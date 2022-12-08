import * as React from 'react';
import { View, Text, Platform, FlatList, StyleSheet, Button, Alert } from 'react-native';
import firebase from 'firebase/compat';
import {useEffect, useState} from "react";
import { recipearray } from './Algorithm';

const RecipeDetails = ({route,navigation}) => {
    const [recipe,setrecipe] = useState({});

    useEffect(() => {
        // Henter recipe values fra databasen
        
        setrecipe(route.params.recipe[0]);
        console.log("route.params.recipe: " + route.params.recipe[0])
console.log(recipearray)

       // tømmer objektet når man forlader RecipeDetails skærmen
        return () => {
            setrecipe({})
        }
    });


// hvis der ikke er data i databasen. det burde der være når man er på Details-skærmen
    if (!recipe) {
        return <Text>No data</Text>;
    }

    // Nu kommer det brugeren rent faktisk kan se
    // to knapper, der kører de før specificerede funktioner
    // herefter vises både keys og values
    return (
        <View style={styles.container}>
            
            {
                Object.entries(recipe).map((item,index)=>{
                    return(
                        <View style={styles.row} key={index}>
                          
                            <Text style={styles.value}>{item[1]}</Text>
                        </View>
                    )
                })
            }
        </View>
    );
}

export default RecipeDetails;

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'flex-start' },
    row: {
        margin: 5,
        padding: 5,
        flexDirection: 'row',
    },
    label: { width: 100, fontWeight: 'bold' },
    value: { flex: 1 },
});