import * as React from 'react';
import { View, ScrollView, Text, Platform, FlatList, StyleSheet, Button, Alert } from 'react-native';
import firebase from 'firebase/compat';
import {useEffect, useState} from "react";
import { recipearray } from './Algorithm';
import { ingredientarray } from './IngredientList';

let matchArray = []
let noMatchArray = []



const RecipeDetails = ({route,navigation}) => {
    const [recipe,setrecipe] = useState({});

    useEffect(() => {
        // Henter recipe values fra databasen
        
        setrecipe(route.params.recipe[0]);
        console.log("route.params.recipe: " + route.params.recipe[0])




       // tømmer objektet når man forlader RecipeDetails skærmen
        return () => {
            setrecipe({})
        }
    });
    
var temp = Object.values(recipe)
console.log(temp)

temp.forEach(element => {
    if(ingredientarray.includes(element)){
        matchArray.push(element)
        
    }
    else{
        noMatchArray.push(element)
    }
console.log(matchArray)
console.log(noMatchArray)

})
let noMatchObjectArray = Object.assign({}, noMatchArray);
let matchObjectArray = Object.assign({}, matchArray);
let countMatchArray = matchArray.length
matchArray = []
noMatchArray = []



// hvis der ikke er data i databasen. det burde der være når man er på Details-skærmen
    if (!recipe) {
        return <Text>No data</Text>;
    }

    // Nu kommer det brugeren rent faktisk kan se
    // to knapper, der kører de før specificerede funktioner
    // herefter vises både keys og values
    return (
        <ScrollView style={styles.container}>
            
            {
                
                    
                        <View style={styles2.row}>
                            <Text style={styles2.value}>Antal matchende ingredienser: {countMatchArray}</Text>
                            
                        </View>
                    
                
            }

{
                Object.entries(matchObjectArray).map((item1,index1)=>{
                    return(
                        <View style={styles.row} key={index1}>
                           
                            <Text style={styles.value}>{item1[1]}</Text>
                        </View>
                    )
                })
            }

            {
                Object.entries(noMatchObjectArray).map((item1,index1)=>{
                    return(
                        <View style={styles1.row} key={index1}>
                          
                            <Text style={styles1.value}>{item1[1]}</Text>
                        </View>
                    )
                })
            }
        </ScrollView>
        
       
    );

    
}

export default RecipeDetails;

const styles = StyleSheet.create({
    container: { flex: 1},
    row: {
        margin: 5,
        padding: 5,
        flexDirection: 'row',
    },
    label: { width: 100, fontWeight: 'bold' },
    value: { flex: 1, color: 'green', fontSize: 20, textTransform: "capitalize"},
});

const styles1 = StyleSheet.create({
    container: { flex: 1 },
    row: {
        margin: 5,
        padding: 5,
        flexDirection: 'row',
    },
    label: { width: 100, fontWeight: 'bold' },
    value: { flex: 1, color: "red", fontSize: 20, textTransform: "capitalize"},
});

const styles2 = StyleSheet.create({
    container: { flex: 1},
    row: {
        margin: 5,
        padding: 5,
        flexDirection: 'row',
    },
    label: { width: 100, fontWeight: 'bold' },
    value: { flex: 1, fontWeight: 'bold', fontSize: 20 },
});