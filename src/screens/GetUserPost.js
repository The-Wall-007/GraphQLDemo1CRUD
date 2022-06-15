import React, {useState} from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {gql, useLazyQuery} from '@apollo/client';

const GetUserPost = () => {
  const GET_USER_POST = gql`
    query ($id: ID!) {
      user(id: $id) {
        posts {
          data {
            id
            title
          }
        }
      }
    }
  `;

  const [getPosts, {loading, data, error}] = useLazyQuery(GET_USER_POST);

  const [userID, setUserID] = useState('');

  const handleSearch = () => {
    getPosts({
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
      {data !== undefined && (
        <FlatList
          data={data.user.posts.data}
          keyExtractor={item => item.id}
          renderItem={({item}) => <Text>{item.title}</Text>}
        />
      )}
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

export default GetUserPost;
