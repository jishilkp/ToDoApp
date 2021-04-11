import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

const Task = (props) => {
    return (
        <View style={styles.task}>
            <Image style={styles.taskIcon} source={require('../assets/icon.png')} />
            <Text style={styles.taskTitle}>{props.title}</Text>
        </View>
    )
}

export default Task

const styles = StyleSheet.create({
    task: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor : '#F7DC6F',
        borderWidth: 1,
        marginBottom: 20
    },
    taskIcon: {
        width: 35,
        height: 35,
        backgroundColor: '#F7DC6F',
        borderRadius:5,
        marginRight: 15
    },
    taskTitle: {
        maxWidth: '80%',
        fontSize: 18
    },
    taskAction: {

    },
})
