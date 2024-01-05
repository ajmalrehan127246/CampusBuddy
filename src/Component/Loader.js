//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Modal,Dimensions,ActivityIndicator } from 'react-native';

// create a component
const Loaders = ({visible}) => {
    return (
        <Modal visible={visible} transparent >
            <View style={styles.modalView}>
                <View style={styles.mainview}>
          <ActivityIndicator size={'large'}/>
                </View>
            </View>
        </Modal>
    );
};

//make this component available to the app
export default Loaders;

// define your styles
const styles = StyleSheet.create({
    modalView:{
width:Dimensions.get('window').width,
height:Dimensions.get('window').height,
backgroundColor:'rgba(0,0,0,.6)',
// alignSelf:'center',
justifyContent:'center',
alignItems:'center',
    },
    mainview:{
        width:100,
        height:100,
        borderRadius:50,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',

    }
});


