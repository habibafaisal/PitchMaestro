import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import Welcome from '../screens/Welcome';
import {NavigationContainer} from '@react-navigation/native';
import PlatformInput from '../screens/PlatformInput';
import Guidelines from '../screens/Guidelines';

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Guidelines" component={Guidelines} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Platform" component={PlatformInput} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
