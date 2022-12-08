import * as React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import firebase from 'firebase/compat';
import {useEffect, useState} from "react";
import { swipeidarray } from './SwipeUI'

let arrayforlist = []
let arrayfordetails = []

const RecipesList = ({navigation}) => {

    const [recipes,setrecipes] = useState()

    useEffect(() => {
        if(!recipes) {
            firebase
                .database()
                .ref('/Recipes')
                .on('value', snapshot => {
                    setrecipes(snapshot.val())
                });
        }
    },[]);
 
    // Vi viser denne text hvis der ikke er data i recipes dokumentet i databasen
    if (!recipes) {
        return <Text>Klik på add recipes for at tilføje ingredienser</Text>;
    }

   swipeidarray.forEach((element) => {
       // console.log(element)
       arrayforlist.push(recipes[element])
})
    // laver alle values og keys om til arrays, så FlaiList kan tage imod dem
    //console.log(Object.entries(recipes).length)
    //console.log(Object.entries(recipes)[0][0])
    const recipeArray = Object.values(recipes);
    const recipeKeys = Object.keys(recipes);
    
   
swipeidarray.forEach((element) => {
    arrayfordetails.push(recipeKeys[element-1])    
    arrayfordetails.push(Object.values(recipes[element]))
})   


   
//console.log(swipeidarray)
 const handleSelectrecipe = id => {
//Her søger vi direkte i vores array af ingredienser og finder objektet som matcher det id brugeren har sendt afsted
//Obejct.entries laver objektet om til arrays hvor hver key og value har sit eget array
// .find finder objektet hvor første index af array'et er lig med id'et
        let index = arrayfordetails.findIndex(element => Number(element) === id) + 1
        console.log("her er index: " + index)
        console.log(arrayfordetails)
        const recipe = arrayfordetails[index]
        console.log("her er id: " + id)
        //const recipe = arrayfordetails[1]
      
        navigation.navigate('Recipe Details', { recipe });
    };

    
// flat list præsenterer arrays som en liste i react.
// flatlist indeholder elementer som keyextractor og renderitem
// keyextractor sørger for at handleselectrecipe funktionen får det rigtige id
    return (
        <FlatList
            data={arrayforlist}
            // Vi bruger recipeKeys til at finde ID på den aktuelle ingrediens og returnerer dette som key, og giver det med som ID til RecipesListItem
            keyExtractor={(index) => recipeKeys[index]}
            
            renderItem={({ item, index }) => {
                
                return(
                    <TouchableOpacity style={styles.container} onPress={() => handleSelectrecipe(swipeidarray[index])}>
                        <Text>
                            {item.name}
                            
                            
                            

                        </Text>
                    </TouchableOpacity>
                )
            }}
        />
    );
}

export default RecipesList;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        borderRadius:10,
        margin: 5,
        padding: 5,
        height: 50,
        justifyContent:'center'
    },
    label: { fontWeight: 'bold' },
});