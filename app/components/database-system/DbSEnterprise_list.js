/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useState, useEffect } from 'react';
import {
  StyleSheet, TextInput, View, Image, Text, TouchableOpacity, Button, ScrollView, Animated, Dimensions,
  ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Divider } from 'react-native-elements';
const { height, width } = Dimensions.get('window');
import { Flex, Icon } from '@ant-design/react-native'
import { select } from 'redux-saga/effects';
import { BASE_URL, fullOrderData } from '@app/data';

const data = [
  {
    title: "Cơ khí chế tạo",
    image: require('@images/products/mechanical-engineering.jpg'),
    count: 214
  },
  {
    title: "Ô tô",
    image: require('@images/products/car.jpg'),
    count: 123
  },
  {
    title: "Dệt may",
    image: require('@images/products/textile.jpg'),
    count: 111
  },
  {
    title: "Da giày",
    image: require('@images/products/leather-shoes.jpg'),
    count: 32
  },
  {
    title: "Điện tử",
    image: require('@images/products/electronic.jpg'),
    count: 23
  },
  {
    title: "Khác",
    image: require('@images/products/other.jpg'),
    count: 12
  },
]
const DbSEnterprise_List = () => {
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false);
  const [state, setState] = useState({ data, })
  const [selectedProfession, setSelectedProfession] = useState(null)
  //const [selectedProfession, setSelectedProfession] = useState(null)
  useEffect(() => {
    if (selectedProfession == null)
      easeIn();
    else {
      child_easeIn();
    }
    setLoading(false);
    setRefreshing(false);
    return () => { };
  }, [loading, refreshing]);
  const easeAnim = useRef(new Animated.Value(-(height))).current;
  const child_easeAnim = useRef(new Animated.Value(-(height))).current;
  const navigation = useNavigation();
  const easeIn = (time = 500) => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(easeAnim, {
      toValue: 0,
      duration: time,
      useNativeDriver: false
    }).start();
  };
  const easeOut = (time = 500) => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(easeAnim, {
      toValue: -(height),
      duration: time,
      useNativeDriver: false
    }).start();
  };
  const child_easeIn = (time = 500) => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(child_easeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false
    }).start();
  };
  const child_easeOut = (time = 500) => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(child_easeAnim, {
      toValue: -(height),
      duration: time,
      useNativeDriver: false
    }).start();
  };

  const selectProfession = (value) => {
    easeOut();
    setTimeout(() => {
      setSelectedProfession({ value });
      setRefreshing(true);
    }, 500);
  }

  const combackProfession = () => {
    child_easeOut();
    setTimeout(() => {
      setSelectedProfession(null);
      setRefreshing(true);
    }, 500);
  }

  return (
    <ScrollView style={[styles.container]}>
      {loading ? (
        <ActivityIndicator size="large" color="#fb8c00" style={{ flex: 1, justifyContent: 'center' }} />
      ) : (
        <>
          <View style={{ backgroundColor: '#F5F5F5' }}>
            <Flex>
              <Flex.Item>{selectedProfession == null ? <></> : <Icon name='left' onPress={() => combackProfession()} style={{ marginLeft: 10 }} color='#64B5F6' />}</Flex.Item>
              <Flex.Item flex={10}>
                <Text style={{ textAlign: 'center', color: '#64B5F6', padding: 10, fontSize: 16, fontWeight: 'bold' }}>{selectedProfession == null ? "Ngành nghề" : selectedProfession.value.title}</Text>
              </Flex.Item>
              <Flex.Item></Flex.Item>
            </Flex>
          </View>
          <View style={[styles.controlSpace]}>
            {selectedProfession == null ?
              data && data.length ?
                data.map((item, index) => {
                  return (
                    <Animated.View key={"dbs" + index} animation={''} style={[styles.buttonView, index % 2 != 0 ? { left: easeAnim } : { right: easeAnim }]}>
                      <TouchableOpacity onPress={() => selectProfession(item)}>
                        <View style={{ position: 'relative' }}>
                          <Image source={item.image} style={styles.image} />
                          <View style={styles.containerTitle}>
                            <View style={styles.title}>
                              <Text style={styles.titleHead}>{item.title}</Text>
                              <Text style={styles.titleBody}>Doanh nghiệp ({item.count})</Text>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </Animated.View>)
                })
                : <><Text>Không có dữ liệu</Text></>
              :
              data && data.length ?
                data.map((item, index) => {
                  return (
                    <Animated.View key={"dbs" + index} animation={''} style={[styles.buttonView, index % 2 != 0 ? { left: child_easeAnim } : { right: child_easeAnim }]}>
                      <TouchableOpacity onPress={() => { navigation.navigate('DBSEnterprise_FilterScreen', { data: item }) }}>
                        <View style={{ position: 'relative' }}>
                          <Image source={item.image} style={styles.image} />
                          <View style={styles.containerTitle}>
                            <View style={styles.title}>
                              <Text style={styles.titleHead}>{item.title + "1111111"}</Text>
                              <Text style={styles.titleBody}>Doanh nghiệp ({item.count})</Text>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </Animated.View>)
                })
                : <><Text>Không có dữ liệu</Text></>
            }
          </View>
          <Divider width={1} color="#E0E0E0" style={{ height: 75 }} />
        </>
      )}
    </ScrollView >
  );
};

export default DbSEnterprise_List;

const styles = StyleSheet.create({
  container: {},
  playingSpace: {
    backgroundColor: 'white',
    borderColor: 'blue',
    borderWidth: 3,
  },
  controlSpace: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#F5F5F5'
  },
  buttonView: {
    width: '50%',
    padding: 10
  },
  text: { textAlign: 'center' },
  view: { position: 'relative' },
  containerTitle: {
    position: 'absolute',
    borderRadius: 5,
    backgroundColor: "rgba(0, 0, 0, 0.5) 0%",
    width: '100%',
    height: '100%',
    zIndex: 99999,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: { width: '100%' },
  titleHead: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 20,
    width: '100%', textAlign: 'center'
  },
  titleBody: {
    color: '#fff',
    fontSize: 13,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 20,
    width: '100%', textAlign: 'center'
  },
  image: {
    width: '100%', height: 150,
    borderRadius: 5
  },
})
