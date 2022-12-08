import firebase from 'firebase/compat';
import {useEffect, useState} from "react";
import * as React from 'react';

export var recipearray = []
let index
let index2
const GetRecipes = () => {

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
    },[])
   if(recipes){

    recipes.shift()
    index = 0
    index2 = 1
    recipes.forEach(element => { recipearray.push(Object.values(recipes[index].ingredients)) ; index++});
   recipearray.forEach(element => { recipearray[index2-1].unshift(index2) ; index2++})
   }

}

  export default GetRecipes