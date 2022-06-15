import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';

import {useQuery, gql} from '@apollo/client';

const FetchData = () => {
  const GET_POST = gql`
    query ($options: PageQueryOptions) {
      posts(options: $options) {
        data {
          id
          title
        }
        meta {
          totalCount
        }
      }
    }
  `;

  const {loading, error, data} = useQuery(GET_POST);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(data.posts.data);
  }, [data.posts.data]);

  return (
    <View>
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={({item}) => <Text>{item.title}</Text>}
      />
    </View>
  );
};

export default FetchData;
