import React from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar} from 'react-native-tab-view';
import TaskList from './components/TaskList';

const App = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'allTasks', title: 'All' },
    { key: 'favTasks', title: 'Favorites' },
    { key: 'completedTasks', title: 'Completed' },
  ]);

  const AllTasks = () => (
    <TaskList name="allTasks"/>
  );

  const FavTasks = () => (
    <TaskList name="favTasks"/>
  );

  const CompletedTasks = () => (
    <TaskList name="completedTasks"/>
  );

  const Tasks = () => (
    <TaskList name={routes[index].key}/>
  );

  const renderScene = SceneMap({
    allTasks: Tasks,
    favTasks: Tasks,
    completedTasks: Tasks,
  });

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.tasksHeader}>My Tasks</Text>
        <TabView style={styles.tabsView}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={props => <TabBar {...props} style={styles.tab}/>}
        />
      </View>
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
    paddingTop: 10,
    paddingHorizontal: 2,
    flex: 1
  },
  tasksHeader: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    padding: 5
  },
  tabsView: {
    flex: 8,
    backgroundColor:'#FEFCD6'
  },
  tab: {
    backgroundColor: '#000',
    paddingTop: 5,
    paddingBottom: 5,
  }
});
