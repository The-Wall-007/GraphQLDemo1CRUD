import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

import Home from './screens/Home';
import GetAPost from './screens/GetAPost';
import GetAUser from './screens/GetAUser';
import GetUserPost from './screens/GetUserPost';
import AddData from './screens/AddData';

const Stack = createNativeStackNavigator();

const client = new ApolloClient({
  uri: 'https://graphqlzero.almansi.me/api',
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Get A Post" component={GetAPost} />
          <Stack.Screen name="Get A User" component={GetAUser} />
          <Stack.Screen name="Get User's Post" component={GetUserPost} />
          <Stack.Screen name="Add A Post" component={AddData} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
