import { createDrawerNavigator } from '@react-navigation/drawer';
import MyTabs from './tabNavigator';
import Profile from '../screens/profile';
import MyStack from './stackNavigator';
import Logout from '../screens/Logout';

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={MyStack} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Logout" component={Logout} />
    </Drawer.Navigator>
  );
}