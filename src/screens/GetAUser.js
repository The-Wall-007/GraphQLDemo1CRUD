import React, {useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {gql, useLazyQuery} from '@apollo/client';

const GetAUser = () => {
  const GET_A_USER = gql`
    query ($id: ID!) {
      user(id: $id) {
        name
      }
    }
  `;

  const [getUser, {loading, data, error}] = useLazyQuery(GET_A_USER);

  const [userID, setUserID] = useState('');

  const handleSearch = () => {
    getUser({
      variables: {
        id: userID,
      },
    });
  };

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={'Enter user id (1-10)'}
          onChangeText={setUserID}
          value={userID}
        />
      </View>
      <View style={styles.inputContainer}>
        <Button title={'Search'} onPress={handleSearch} />
      </View>
      {loading && <Text>Loading...</Text>}
      {data && <Text>{data.user.name}</Text>}
      {error && <Text>{error.message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    margin: 16,
    width: '50%',
  },
  input: {
    borderWidth: 1,
  },
});

export default GetAUser;
