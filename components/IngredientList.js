import * as React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import firebase from 'firebase/compat';
import {useEffect, useState} from "react";


export var ingredientarray = []
var index = 0

const IngredientList = ({navigation}) => {

    const [ingredients,setIngredients] = useState()

    useEffect(() => {
        if(!ingredients) {
            firebase
                .database()
                .ref('/Ingredients')
                .on('value', snapshot => {
                    setIngredients(snapshot.val())
                });
        }
    },[]);

    if(ingredients){
        console.log(ingredients)
        const temp = Object.values(ingredients)
        console.log(Object.values(ingredients))
        ingredientarray = []
        temp.forEach(element => {{ ingredientarray.push(Object.values(ingredients)[index].Item) ; index++ }});
        index = 0
        console.log(ingredientarray)
        
        //skal tømmes til sidst!!!!!
        
    }

    

    // Vi viser denne text hvis der ikke er data i Ingredients dokumentet i databasen
    if (!ingredients) {
        return <Text>Klik på add ingredients for at tilføje ingredienser</Text>;
    }

    const handleSelectIngredient = id => {
//Her søger vi direkte i vores array af ingredienser og finder objektet som matcher det id brugeren har sendt afsted
//Obejct.entries laver objektet om til arrays hvor hver key og value har sit eget array
// .find finder objektet hvor første index af array'et er lig med id'et
        const ingredient = Object.entries(ingredients).find( ingredient => ingredient[0] === id )
        navigation.navigate('Ingredient Details', { ingredient });
    };

    // laver alle values og keys om til arrays, så FlaiList kan tage imod dem
    const ingredientArray = Object.values(ingredients);
    const ingredientKeys = Object.keys(ingredients);
// flat list præsenterer arrays som en liste i react.
// flatlist indeholder elementer som keyextractor og renderitem
// keyextractor sørger for at handleselectIngredient funktionen får det rigtige id
    return (
        <FlatList
            data={ingredientArray}
            // Vi bruger ingredientKeys til at finde ID på den aktuelle ingrediens og returnerer dette som key, og giver det med som ID til IngredientListItem
            keyExtractor={(index) => ingredientKeys[index]}
            renderItem={({ item, index }) => {
                return(
                    <TouchableOpacity style={styles.container} onPress={() => handleSelectIngredient(ingredientKeys[index])}>
                        <Text>
                            {item.Brand} {item.Item}
                        </Text>
                    </TouchableOpacity>
                )
            }}
        />
    );
}

export default IngredientList;


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