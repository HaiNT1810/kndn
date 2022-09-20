/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useState } from 'react';
import { StyleSheet, TextInput, View, Image, Text } from 'react-native';
import { Carousel, Button } from '@ant-design/react-native'
import { TDSearchComponent } from '@app/components/search'

const DbS_Carousel = () => {
  const [state, setState] = useState({
    selectedIndex: 0,
    autoplay: true,
  })
  const onHorizontalSelectedIndexChange = (index) => {
    setState({ selectedIndex: index })
  }
  // const onVerticalSelectedIndexChange = (index) => {
  //   /* tslint:disable: no-console */
  //   console.log('vertical change to', index)
  // }
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
  const onChangeText = (text) => {

  }

  return (
    <View style={styles.view}>
      <View style={styles.searchbox}>
        <TDSearchComponent placeholder="Tìm kiếm doanh nghiệp" onChangeText={(text) => onChangeText(text)} onSubmitEditing={(text) => onChangeText(text)} />
      </View>
      <Carousel
        style={styles.wrapper}
        selectedIndex={state.selectedIndex}
        autoplay autoplayInterval={5000} infinite
        afterChange={onHorizontalSelectedIndexChange}
        dotActiveStyle={[{ backgroundColor: "#94d144" }]}>
        {
          data.map((x, index) => {
            return (
              <View key={"dbs" + index} style={styles.containerHorizontal}>
                <Image source={x.image} style={styles.image} />
                <View style={[{ position: 'absolute', backgroundColor: "rgba(0, 0, 0, 0.5) 0%", width: '100%', height: '100%', zIndex: 99999 }]}>
                  <View style={styles.carouselTitle}>
                    <Text style={styles.carouselTitleHead}>{x.title}</Text>
                    <Text style={styles.carouselTitleBody}>Doanh nghiệp ({x.count})</Text>
                  </View>
                </View>
              </View>);
          })
        }
      </Carousel >
    </View >
  );
};

export default DbS_Carousel;

const styles = StyleSheet.create({
  view: { position: 'relative' },
  wrapper: { backgroundColor: '#fff', width: '100%', height: 250, },
  text: { color: '#fff', fontSize: 36, },
  carouselTitle: { position: 'absolute', left: 0, bottom: 75, width: '100%' },
  carouselTitleHead: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 20,
    width: '100%', textAlign: 'center'
  },
  carouselTitleBody: {
    color: '#fff',
    fontSize: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 20,
    width: '100%', textAlign: 'center'
  },
  image: { width: '100%', height: 250 },
  searchbox: { position: 'absolute', zIndex: 9999, width: '100%' }
})
