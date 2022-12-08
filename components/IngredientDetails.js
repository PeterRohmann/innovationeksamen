import * as React from 'react';
import { View, Text, Platform, FlatList, StyleSheet, Button, Alert } from 'react-native';
import firebase from 'firebase/compat';
import {useEffect, useState} from "react";

const IngredientDetails = ({route,navigation}) => {
    const [ingredient,setIngredient] = useState({});

    useEffect(() => {
        // Henter ingredient values fra databasen
        setIngredient(route.params.ingredient[1]);
      
       // tømmer objektet når man forlader IngredientDetails skærmen
        return () => {
            setIngredient({})
        }
    });

    const handleEdit = () => {
        // Vi navigerer videre til Editingredient skærmen og sender bilen videre med
        const ingredient = route.params.ingredient
        navigation.navigate('Edit Ingredient', { ingredient });
    };

    // Vi spørger brugeren om han er sikker
    const confirmDelete = () => {
        /*Er det mobile?*/
        if(Platform.OS ==='ios' || Platform.OS ==='android'){
            Alert.alert('Are you sure?', 'Do you want to delete the ingredient?', [
                { text: 'Cancel', style: 'cancel' },
                // Vi bruger this.handleDelete som eventHandler til onPress
                { text: 'Delete', style: 'destructive', onPress: () => handleDelete() },
            ]);
        }
    };

    // bruges til at slette ingredienser
    const  handleDelete = () => {
        // index 0 er id'et
        const id = route.params.ingredient[0];
        
        try {
            firebase
                .database()
                // specificerer id
                .ref(`/Ingredients/${id}`)
                // -remove fjerner data
                .remove();
            // Og går tilbage til tidligere skærm når det er gjort
            navigation.goBack();
        } catch (error) {
            Alert.alert(error.message);
        }
    };

// hvis der ikke er data i databasen. det burde der være når man er på Details-skærmen
    if (!ingredient) {
        return <Text>No data</Text>;
    }

    // Nu kommer det brugeren rent faktisk kan se
    // to knapper, der kører de før specificerede funktioner
    // herefter vises både keys og values
    return (
        <View style={styles.container}>
            <Button title="Edit" onPress={ () => handleEdit()} />
            <Button title="Delete" onPress={() => confirmDelete()} />
            {
                Object.entries(ingredient).map((item,index)=>{
                    return(
                        <View style={styles.row} key={index}>
                            <Text style={styles.label}>{item[0]} </Text>
                            <Text style={styles.value}>{item[1]}</Text>
                        </View>
                    )
                })
            }
        </View>
    );
}

export default IngredientDetails;

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