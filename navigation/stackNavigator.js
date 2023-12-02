import { createStackNavigator } from '@react-navigation/stack';
import MyTabs from './tabNavigator';
import StoryScreen from '../screens/storyScreen';

const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator initialRouteName='Tab' screenOptions={{headerShown: false}}>
      <Stack.Screen name="Tab" component={MyTabs} />
      <Stack.Screen name="StoryScreen" component={StoryScreen} />
    </Stack.Navigator>
  );
}