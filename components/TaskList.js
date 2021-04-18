import React, {useState, useEffect}  from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Task from './Task';
import CreateTask from './CreateTask';
import uuid from 'react-native-uuid';
import Toast from 'react-native-simple-toast';

let allTasks = [];
const TaskList = (props) => {
    const asyncStorageTasksKey = '@tasks';
    const [tasksItems, setTasksItems] = useState([]);
    const taskType = props.name || 'allTasks';
    let taskStatus = 1;

    switch(taskType) {
        case 'favTasks':
            taskStatus = 2;
            break;
        case 'completedTasks':
            taskStatus = 3;
            break;
        case 'deletedTasks':
            taskStatus = 4;
            break;
    }

    const filterTasksBasedOnStatus = (status) => {
        let filteredTasks = [];
        if(status == 1) {
            filteredTasks = allTasks.filter(function (e) {
                return e.status != 4;
            });
        } else {
            filteredTasks = allTasks.filter(function (e) {
                return e.status == status;
            });
        }
        return filteredTasks;
    };


    const getTasksFromAsyncStorage = async () => {
        try {
          let tasksData = await AsyncStorage.getItem(asyncStorageTasksKey);
          if(tasksData) {
            allTasks = JSON.parse(tasksData);
            setTasksItems(filterTasksBasedOnStatus(taskStatus));
          }
        } catch(error) {
          console.log("Failed to get data from AsyncStorage : "+error);
        }
    };

    const setTasksToAsyncStorage = async (tasks) => {
        try {
          AsyncStorage.setItem(asyncStorageTasksKey, JSON.stringify(tasks));
        } catch(error) {
          console.log("Failed to set data to AsyncStorage : "+error);
        }
    };

    useEffect(() => {
       getTasksFromAsyncStorage();
    }, []);

    const createNewTask = (taskName) => {
        if(taskName) {
          Keyboard.dismiss();
          let task = {
            id : uuid.v4(),
            name : taskName,
            status : taskStatus
          };
          allTasks.push(task);
          setTasksToAsyncStorage(allTasks);
          setTasksItems(filterTasksBasedOnStatus(taskStatus));
          Toast.show("New task created");
        } else {
            Toast.show("Please enter a task");
        }
    };

    const changeTaskStatus = (taskId, status) => {
        allTasks.forEach(function(task) {
            if(task.id === taskId) {
                task.status = status;
            }
        });
        var toastMessage = "";
        switch(status)
        {
            case 1:
                toastMessage = "Task marked as Open";
                break;
            case 2:
                toastMessage = "Task marked as Favorite";
                break;
            case 3:
                toastMessage = "Task marked as Completed";
                break;
            case 4:
                toastMessage = "Task Deleted";
                break;
        }
        Toast.show(toastMessage);
        setTasksItems(filterTasksBasedOnStatus(taskStatus));
        setTasksToAsyncStorage(allTasks);
    };

    return (
        <View style={styles.container}>
            <View style={styles.tasksListWrapper}>
            {
                tasksItems.length ? (
                <FlatList style={styles.itemsList}
                    data={tasksItems}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => {
                    return(
                        <TouchableOpacity key={item.id}>
                            <Task onChangeStatus={(taskId,status) => changeTaskStatus(taskId,status)}  id={item.id} title={item.name} status={item.status} />
                        </TouchableOpacity>
                    )
                    }}
                />
                ) : (
                <View style={styles.noTasksWrapper}>
                    <Text style={styles.noTasksMessage}>No tasks</Text>
                </View>
                )
            }
            </View>
            <CreateTask onCreateTask={(taskName) => createNewTask(taskName)} />
        </View>

    )
}

export default TaskList;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tasksListWrapper: {
        flex: 8,
        marginBottom: 80
    },
    itemsList: {
        marginTop: 20
    },
    noTasksWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        color: 'red',
        height: '100%'
    },
    noTasksMessage: {
        fontSize: 24
    }
})
