import React, {useState, useEffect} from 'react';
import { Platform, KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, FlatList } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Task from './components/Task';

const App = () => {
  const [task, setTask] = useState();
  const [tasksList, setTasksList] = useState([]);
  const asyncStorageTasksKey = '@tasks';

  const getTasksFromAsyncStorage = async () => {
    try {
      const tasks = await AsyncStorage.getItem(asyncStorageTasksKey);
      if(tasks) {
        setTasksList(JSON.parse(tasks));
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

  const createNewTask = () => {
    Keyboard.dismiss();
    const tasks = ([...tasksList,task]);
    setTasksList(tasks);
    setTask(null);
    setTasksToAsyncStorage(tasks);
  };

  const completeTask = (index) => {
    var tasksCopy = [...tasksList];
    tasksCopy.splice(index,1);
    setTasksList(tasksCopy);
    setTasksToAsyncStorage(tasksCopy);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.tasksHeader}>My Tasks</Text>
        {
          tasksList.length ? (
            <FlatList style={styles.tasksList}
              data={tasksList}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item,index}) => {
                return(
                  <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                    <Task title={item} />
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
      <KeyboardAvoidingView behaviour={ Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.createTaskWrapper}>
        <TextInput style={styles.taskInput} placeholder='Create a new task..' value={task} onChangeText={text => setTask(text)}/>
        <TouchableOpacity style={styles.addTaskButton} onPress={() => createNewTask()}>
          <Text style={styles.addTaskButtonText}>+</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  )
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor : '#FEFCD6',
  },
  tasksWrapper: {
    paddingTop: 20,
    paddingHorizontal: 20
  },
  tasksHeader: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30
  },
  tasksList: {
    height: '75%'
  },
  createTaskWrapper: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 30,
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
    borderColor : '#F7DC6F',
    borderWidth: 3,
    borderRadius: 50,
    alignItems : 'center',
    justifyContent: 'center'
  },
  addTaskButtonText: {
    fontSize:38
  },
  noTasksWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    color: 'red',
    height: '80%'
  },
  noTasksMessage: {
    fontSize : 24
  }
});
