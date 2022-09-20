import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

import images from '../../themes/Images';

const TDNoItem = (props) => {
  const {title, description, ContentButton} = props;
  return (
    <View style={styles.content}>
      <Image source={images.images.nodata} style={styles.image} />
      <Text style={styles.text1}>{title ? title : `Không có dữ liệu`}</Text>
      {description && <Text style={styles.text2}>{description}</Text>}
      {ContentButton && <ContentButton />}
    </View>
  );
};

export default TDNoItem;

const styles = StyleSheet.create({
  content: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  image: {height: 200, resizeMode: 'center'},
  text1: {fontSize: 14, fontWeight: '500', color: '#414141', margin: 10},
  text2: {fontSize: 14, color: '#899096', margin: 5},
});
