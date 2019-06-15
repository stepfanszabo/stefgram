import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer  } from 'react-navigation';
import { f, auth, database, storage } from './config/config.js'

import Feed from './app/screens/feed.js';
import Upload from './app/screens/upload.js';
import Profile from './app/screens/profile.js';
import UserProfile from './app/screens/userProfile.js';
import Comments from './app/screens/comments.js';

const TabStack = createBottomTabNavigator (
  {
    Feed: { screen: Feed },
    Upload: { screen: Upload },
    Profile: { screen: Profile }
  }
)

const MainStack = createStackNavigator (
  {
    Home: { screen: TabStack },
    User: { screen: UserProfile },
    Comments: { screen: Comments }
  },
  {
    initialRouteName: 'Home',
    mode: 'modal',
    headerMode: 'none',
  }
)

const AppContainer = createAppContainer(MainStack);

export default class App extends React.Component {
  
  constructor(props) {
    super(props);
    createAppContainer(MainStack);
  }

  render() {
    return (
      <AppContainer style={{marginVertical:10}}/>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
