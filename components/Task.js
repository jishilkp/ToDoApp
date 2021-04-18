import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Task = (props) => {
    return (
        <View style={styles.task}>
            <Image style={styles.taskIcon} source={require('../assets/icon.png')} />
            <Text style={styles.taskTitle}>{props.title}</Text>
            <View style={styles.taskActions}>
                {
                    props.status == 2 ?
                    <Icon style={styles.actionButton} name="favorite" size={30}
                    onPress={() => props.onChangeStatus(props.id, 1)}/> :
                    (
                        props.status != 3 &&
                        <Icon style={styles.actionButton} name="favorite-outline" size={30}
                        onPress={() => props.onChangeStatus(props.id, 2)}/>
                    )
                }
                {
                    props.status != 3 &&  props.status != 4 ?
                    <Icon style={styles.actionButton} name="done-all" size={30} onPress={() => props.onChangeStatus(props.id, 3)}/> :
                    <Icon style={styles.actionButton} name="remove-done" size={30} onPress={() => props.onChangeStatus(props.id, 1)}/>
                }
                <Icon style={styles.actionButton} name="delete-outline" size={30}
                    onPress={() => props.onChangeStatus(props.id, 4)}/>
            </View>
        </View>
    )
}

export default Task

const styles = StyleSheet.create({
    task: {
        backgroundColor: 'white',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        borderRadius: 0,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor : '#F7DC6F',
        borderWidth: 1,
        marginHorizontal: 5,
        marginBottom: 10
    },
    taskIcon: {
        width: 32,
        height: 32,
        backgroundColor: '#F7DC6F',
        borderRadius:5,
        marginRight: 5

    },
    taskTitle: {
        fontSize: 18,
        flex: 5
    },
    taskActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        flex: 2,
        marginRight: 5,
        marginLeft: 10
    },
    actionButton: {
        marginHorizontal: 5
    }
})
