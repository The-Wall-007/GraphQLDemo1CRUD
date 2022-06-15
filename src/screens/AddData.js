import React, {useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {gql, useMutation} from '@apollo/client';

const AddData = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const ADD_POST = gql`
    mutation ($input: CreatePostInput!) {
      createPost(input: $input) {
        id
        title
        body
      }
    }
  `;

  const [createPost, {data, loading, error}] = useMutation(ADD_POST);

  const handleAddPost = () => {
    createPost({
      variables: {
        input: {
          title,
          body,
        },
      },
    });
  };

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <View
        style={{
          marginHorizontal: 20,
          marginTop: 50,
          width: '100%',
          alignItems: 'center',
        }}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={'Enter post title'}
            onChangeText={setTitle}
            value={title}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={'Enter post body'}
            onChangeText={setBody}
            value={body}
          />
        </View>
        <View style={styles.inputContainer}>
          <Button title={'Add'} onPress={handleAddPost} />
        </View>
      </View>

      <View style={{margin: 40, height: 100, borderWidth: 1, width: '80%'}}>
        {loading && <Text>loading...</Text>}
        {error && <Text>{error.name}</Text>}
        {data && (
          <>
            <Text>{data.createPost.title}</Text>
            <Text>{data.createPost.body}</Text>
          </>
        )}
      </View>
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

export default AddData;
