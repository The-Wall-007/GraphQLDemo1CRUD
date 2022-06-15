import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Button
        title="Get a Post"
        onPress={() => navigation.navigate('Get A Post')}
      />
      <Button
        title="Get a User"
        onPress={() => navigation.navigate('Get A User')}
      />
      <Button
        title="Get User's Post"
        onPress={() => navigation.navigate(`Get User's Post`)}
      />
      <Button
        title="Create a Post"
        onPress={() => navigation.navigate(`Add A Post`)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    marginHorizontal: 64,
  },
});

export default Home;
