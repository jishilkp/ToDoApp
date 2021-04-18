import React, {useState} from 'react'
import { Platform, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

const CreateTask = (props) => {
    const [taskName, setTaskName] = useState();

    const newTask = (taskName) => {
        props.onCreateTask(taskName);
        setTaskName(null);
    }

    return (
        <KeyboardAvoidingView behaviour={ Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.createTaskWrapper}>
            <TextInput style={styles.taskInput} placeholder='Create a new task..' value={taskName} onChangeText={text => setTaskName(text)}/>
            <TouchableOpacity style={styles.addTaskButton} onPress={() => newTask(taskName)}>
                <Text style={styles.addTaskButtonText}>+</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}

export default CreateTask;

const styles = StyleSheet.create({
    createTaskWrapper: {
        position: 'absolute',
        flexDirection: 'row',
        bottom: 10,
        alignItems : 'center',
        justifyContent: 'space-around',
        width: '100%'
      },
      taskInput: {
        backgroundColor: 'white',
        width: '70%',
        padding: 10,
        borderColor : '#F7DC6F',
        borderWidth: 2,
        borderRadius: 50,
        fontSize: 16
      },
      addTaskButton: {
        backgroundColor: 'yellow',
        width: 60,
        height: 60,
        borderColor : '#000',
        borderWidth: 3,
        borderRadius: 50,
        alignItems : 'center',
        justifyContent: 'center'
      },
      addTaskButtonText: {
        fontSize:38
      }
})
