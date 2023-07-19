import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native';
import ProductListing from './screens/productListing';
import Favorites from './screens/favorites';
import ProductDetails from './screens/productDetails';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductContext from './context/index.js';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function Bottomtabs() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen options={{
        title: 'Product List'
      }}
        name='Product Listing'
        component={ProductListing} />
      <Tabs.Screen options={{
        title: 'Favorites'
      }}
        name='Favorites'
        component={Favorites} />
    </Tabs.Navigator>
  )
}
// #FFE4B5
// #220577dd
export default function App() {
  return (
    <ProductContext>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <NavigationContainer>
          <Stack.Navigator
          screenOptions={{
            headerStyle : {
              backgroundColor: '#fff'
            },
            contentStyle : {
              backgroundColor : '#220577dd'
            }
          }}
          >
            <Stack.Screen options={{
              headerShown: false
            }} name='bottomTabs' component={Bottomtabs} />
            <Stack.Screen
              name='productDetails'
              options={{
                title: 'Product Details'
              }} component={ProductDetails} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
        </ProductContext>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
