/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, Image, Text, TouchableOpacity, Button, ScrollView, Animated, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Divider } from 'react-native-elements';
const { height, width } = Dimensions.get('window');

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
const DbSProduct_List = () => {
  const [state, setState] = useState({
    data,
  })
  useEffect(() => {
    fadeIn();
    return () => { };
  }, []);
  const fadeAnim = useRef(new Animated.Value(-(width))).current;
  const navigation = useNavigation();
  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false
    }).start();
  };

  return (
    <ScrollView style={[styles.container]}>
      <View style={[styles.controlSpace]}>
        {data && data.length ?
          data.map((item, index) => {
            return (
              <Animated.View key={"dbs" + index} animation={''} style={[styles.buttonView, index % 2 != 0 ? { left: fadeAnim } : { right: fadeAnim }]}>
                <TouchableOpacity onPress={() => { }}>
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
          : <><Text>Không có dữ liệu</Text></>}
      </View>
      <Divider width={1} color="#E0E0E0" style={{ height: 75 }} />
    </ScrollView >
  );
};

export default DbSProduct_List;

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
