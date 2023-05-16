import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  LayoutAnimation,
  ActivityIndicator
} from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '@app/themes';
import { TD_Header } from '@app/components';
import Icon from 'react-native-vector-icons/FontAwesome';
import { topicGroup } from '@datas';

function AccordionItem({ children, title }) {
  const [expanded, setExpanded] = useState(true);
  function toggleItem() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  }
  const body = <View style={styles.accordBody}>{children}</View>;
  return (
    <View style={styles.accordContainer}>
      <TouchableOpacity style={styles.accordHeader} onPress={toggleItem}>
        <Text style={styles.accordTitle}>{title}</Text>
        <Icon name={expanded ? 'chevron-up' : 'chevron-down'}
          size={20} style={styles.accordIcon} />
      </TouchableOpacity>
      {expanded && body}
    </View>
  );
}

function Topic({ props }) {
  const { id, text } = props;
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.topicContainer}
      onPress={() => {
        navigation.navigate('Topic_ListScreen', {
          topicId: id,
          topicName: text,
        });
      }}>
      <Text style={styles.topicName}>{text}</Text>
    </TouchableOpacity>
  );
}

const Topic_HomeScreen = (props) => {
  const dataService = useSelector((state) => state.global.dataService);
  const user = useSelector((state) => state.global.user);
  const accessToken = useSelector((state) => state.global.accessToken);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setData(topicGroup);
      setLoading(false);
    };
    fetchData();
    return () => { };
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.TD_Background }}>
      <TD_Header checkrightComponent {...props} title="Chủ đề thảo luận" />
      {loading ? (
        <ActivityIndicator size="large" color="#fb8c00" style={{ flex: 1, justifyContent: 'center' }} />
      ) : (
        <SafeAreaView style={styles.container}>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.container}>
            {data.map(item => <AccordionItem title={item.text}>
              {item.child.map(child => <Topic props={child} />)}
            </AccordionItem>)}
          </ScrollView>
        </SafeAreaView>
      )}
    </View>
  );
};

export default Topic_HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 2
  },

  accordHeader: {
    padding: 10,
    backgroundColor: Colors.GLOBAL_Header,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  accordTitle: {
    fontSize: 20,
    color: Colors.white,
    textTransform: 'uppercase'
  },
  accordIcon: {
    color: Colors.white
  },
  topicName: {
    fontSize: 18,
    color: Colors.GLOBAL_Header,
    paddingVertical: 10,
    paddingHorizontal: 24
  }
});
