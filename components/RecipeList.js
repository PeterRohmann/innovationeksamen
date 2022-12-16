import * as React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet, ImageBackground} from 'react-native';
import firebase from 'firebase/compat';
import {useEffect, useState} from "react";
import { swipeidarray } from './SwipeUI'
import { useFocusEffect, useIsFocused } from '@react-navigation/native';


let arrayforlist = []
let arrayfordetails = []

const RecipesList = ({navigation}) => {

    const [recipes,setrecipes] = useState()
    const isFocused = useIsFocused()
console.log(recipes)

    useEffect(() => {
        if(!recipes) {
            firebase
                .database()
                .ref('/Recipes')
                .on('value', snapshot => {
                    setrecipes(snapshot.val())
                });
        }
    }, [isFocused]);

 console.log(recipes)
    // Vi viser denne text hvis der ikke er data i recipes dokumentet i databasen
    
    if (!recipes) {
        return 
    }
arrayforlist = []
arrayfordetails = []
   swipeidarray.forEach((element) => {
       // console.log(element)
       arrayforlist.push(recipes[element])
})
    // laver alle values og keys om til arrays, så FlaiList kan tage imod dem
    //console.log(Object.entries(recipes).length)
    //console.log(Object.entries(recipes)[0][0])
    
    const recipeKeys = Object.keys(recipes);
    console.log(recipeKeys)
    
   
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
        
        //console.log("arrayfordetails: "+arrayfordetails)
        //console.log(arrayfordetails)
        
        const recipe = arrayfordetails[index]
        
        //const recipe = arrayfordetails[1]
      
        navigation.navigate('Recipe Details', { recipe, id });
    };

    
// flat list præsenterer arrays som en liste i react.
// flatlist indeholder elementer som keyextractor og renderitem
// keyextractor sørger for at handleselectrecipe funktionen får det rigtige id
    return (
        <ImageBackground source={require("../assets/opacity.png")}  style={styles.image} >
        <View>
        <FlatList style={styles.flatlist}
            data={arrayforlist}
            // Vi bruger recipeKeys til at finde ID på den aktuelle ingrediens og returnerer dette som key, og giver det med som ID til RecipesListItem
            keyExtractor={(index) => recipeKeys[index]}
            
            renderItem={({ item, index }) => {
                
                return(
                    <TouchableOpacity style={styles.container} onPress={() => handleSelectrecipe(swipeidarray[index])}>
                        <Text style={styles.text}>
                            {item.name}
                            
                            
                            

                        </Text>
                    </TouchableOpacity>
                )
            }}
        />
        
        </View>
        </ImageBackground>
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
        fontsize: 50,
        justifyContent:'center'
    },
    flatlist: {
    marginTop: 85
    },
    text: {
    fontSize: 20,
    fontWeight: "bold",
    color: `#000000`,
    opacity: 1
    },
    label: { fontWeight: 'bold' },
    image: {
       opacity: 1,
       height: "100%",
       width: "100%"
    }
});
