import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feed from '../screens/feed';
import { RFValue } from "react-native-responsive-fontsize";
import firebase from 'firebase';
import CreateHistory from '../screens/createHistory';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { StyleSheet } from 'react-native';

const Tab = createMaterialBottomTabNavigator();

export default class MyTabs extends React.Component {
  constructor() {
    super()
    this.state = {
      light_theme: true,
      isUpdated: false
    }
  }
  async fetchUser() {
    let theme;
    await firebase
        .database()
        .ref("/users/" + firebase.auth().currentUser.uid)
        .on("value", function (snapshot) {
            theme = snapshot.val().current_theme;
        });
    this.setState({
        light_theme: theme === "light" ? true : false,
    });
  } 
componentDidMount() {
  this.fetchUser()
}

renderFeed = props => {
  return <Feed setUpdateToFalse={this.removeUpdated} {...props} />;
};

renderStory = props => {
  return <CreateHistory setUpdateToTrue={this.changeUpdated} {...props} />;
};

changeUpdated = () => {
  this.setState({ isUpdated: true });
};

removeUpdated = () => {
  this.setState({ isUpdated: false });
};

render() {


    return (
      <Tab.Navigator
        labeled={false}
        barStyle={this.state.light_theme? styles.bottomTabStyleLight :styles.bottomTabStyle}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Feed") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "CreateHistory") {
              iconName = focused ? "add-circle" : "add-circle-outline";
            }
            return (
              <Ionicons
                name={iconName}
                size={RFValue(25)}
                color={color}
                style={styles.icons}
              />
            );
          }
        })}
        activeColor={"#ee8249"}
        inactiveColor={"gray"}
      >
        <Tab.Screen name="Feed" component={this.renderFeed} options={{ unmountOnBlur: true }}/>
        <Tab.Screen name="CreateHistory" component={this.renderStory} options={{ unmountOnBlur: true }}/>
      </Tab.Navigator>
    );
  }
}
const styles = StyleSheet.create({
  bottomTabStyle: {
    backgroundColor: "#2f345d",
    height: "8%",
    borderTopLeftRadius: RFValue(30),
    borderTopRightRadius: RFValue(30),
    overflow: "hidden",
    position: "absolute"
  },
  bottomTabStyleLight: {
    backgroundColor: "#eaeaea",
    height: "8%",
    borderTopLeftRadius: RFValue(30),
    borderTopRightRadius: RFValue(30),
    overflow: "hidden",
    position: "absolute"
  },
  icons: {
    width: RFValue(30),
    height: RFValue(30)
  }
});