import React, {useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {gql, useLazyQuery} from '@apollo/client';

const GetAPost = () => {
  const GET_A_POST = gql`
    query ($id: ID!) {
      post(id: $id) {
        id
        title
        body
      }
    }
  `;

  const [getPost, {loading, data, error}] = useLazyQuery(GET_A_POST);

  const [postID, setPostID] = useState('');

  const handleSearch = () => {
    getPost({
      variables: {
        id: postID,
      },
    });
  };

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={'Enter post id (1-100)'}
          onChangeText={setPostID}
          value={postID}
        />
      </View>
      <View style={styles.inputContainer}>
        <Button title={'Search'} onPress={handleSearch} />
      </View>
      {loading && <Text>Loading...</Text>}
      {data && <Text>{data.post.body}</Text>}
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

export default GetAPost;
