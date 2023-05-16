import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  FlatList
} from 'react-native'
import { useState, useEffect } from 'react'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import { Colors } from '@themes'
import { TD_Header } from '@app/components'
import { Topic_PaginationScreen } from '.'
import { postData } from '@datas'


const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const Topic_ListScreen = (props) => {
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const [posts, setPosts] = useState([])
  const dataRoute = route?.params ?? {
    topicId: 0,
    topicName: "",
  };
  const [page, setPage] = useState(1);
  const changePage = page => setPage(page);
  useEffect(() => {
    const fetchData = async () => {
      let tmp = postData.filter(x => x.TopicId == dataRoute.topicId);
      setPosts(tmp)
      setLoading(false);
    };
    if (loading)
      fetchData();
    return () => { };
  }, [dataRoute, loading, page]);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.TD_Background }}>
      <TD_Header checkStack {...props} title={dataRoute.topicName ?? "12"} />
      {loading ? (
        <ActivityIndicator size="large" color="#fb8c00" style={{ flex: 1, justifyContent: 'center' }} />
      ) : (
        <ScrollView style={{ flex: 1 }}>
          <Topic_PaginationScreen total={posts.length} parentCallback={changePage}/>
          <FlatList
            data={posts}
            renderItem={({ item }) => <Item title={item.Title} />}
            keyExtractor={item => item.Id}
          />
        </ScrollView>
      )}
    </View>
  )
}

export default Topic_ListScreen

const styles = StyleSheet.create({})